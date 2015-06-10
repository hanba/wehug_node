﻿define(function(require,exports) {
    var $=require("$");
    var LinkList=require("./linklist");
    var Matrix2D=require("graphics/matrix2d");
    var tween=require("graphics/tween");

    var vendors=['webkit'/*,'moz','o','ms'*/];

    for(var x=0;x<vendors.length&&!window.requestAnimationFrame;++x) {
        window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if(!window.requestAnimationFrame) {
        window.requestAnimationFrame=function(callback) {
            return setTimeout(function() {
                callback(currTime+timeToCall);
            },16.7);
        };
        window.cancelAnimationFrame=function(id) {
            clearTimeout(id);
        };
    }

    var list=new LinkList();
    var animationStop=true;
    var TRANSFORM=$.fx.cssPrefix+'transform',
        defaultStyle={
            opacity: 1
        },
        numReg=/\d+\.\d+|\d+/g,
        percentReg=/(\d+\.\d+|\d+)\%/g,
        translatePercentReg=/translate\((\-{0,1}\d+(?:\.\d+){0,1}(?:\%|px){0,1})\s*\,\s*(\-{0,1}\d+(?:\.\d+){0,1}(?:\%|px){0,1})\)/,
        matrixReg=/matrix\((\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\,\s*(\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\,\s*(\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\,\s*(\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\,\s*(\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\,\s*(\-{0,1}\d+\.\d+|\-{0,1}\d+)\s*\)/,
        transformReg=/(translate|skew|rotate|scale|matrix)\(([^\)]+)\)/g,
        matrixEndReg=/matrix\([^\)]+\)\s*$/;

    var getEase=function(ease) {
        if(!ease) ease=[tween.easeOut];
        else {
            if(!(ease instanceof Array)) ease=[ease];

            for(var i=0,n=ease.length;i<n;i++) {
                if(typeof ease[i]=="string")
                    ease[i]=tween[ease[i].replace(/\-([a-z])/g,function($0,$1) {
                        return $1.toUpperCase();
                    })];
            }
        }
        return ease;
    }

    var toFloatArr=function(arr) {
        var result=[];
        $.each(arr,function(i,item) {
            result.push(isNaN(parseFloat(item))?0:parseFloat(item))
        });
        return result;
    }

    var getCurrent=function(from,end,d) {
        return parseFloat(from)+(parseFloat(end)-parseFloat(from))*d;
    }

    var getMatrixByTransform=function(transform) {
        var m2d=new Matrix2D();
        transform.replace(transformReg,function($0,$1,$2) {
            m2d[$1=='matrix'?'append':$1].apply(m2d,toFloatArr($2.split(',')));
        });

        return m2d;
    }

    var toTransform=function(css) {
        var result={},
            origTransform,
            m2d;

        $.each(css,function(key,val) {
            if(/matrix|translate|skew|rotate|scale|invert/.test(key)) {
                if(key==='translate') {
                    val=(result[TRANSFORM]||'')+' '+key+'('+val+')';

                } else {
                    if(!m2d) m2d=new Matrix2D();
                    origTransform=(result[TRANSFORM]||'');
                    val=m2d[key=='matrix'?'append':key].apply(m2d,toFloatArr(val.split(','))).toString();
                    val=matrixEndReg.test(origTransform)?origTransform.replace(matrixEndReg,val):(origTransform+' '+val);
                }

                key=TRANSFORM;

            } else if(key==='transform') {
                key=TRANSFORM;
                m2d=null;
            }
            result[key]=val;
        });

        return { css: result,matrix: m2d };
    };

    $.fn.transform=function(css) {
        this.css(toTransform(css).css);

        return this;
    };

    $.fn.matrix=function(matrix) {
        if(matrix instanceof Matrix2D) {
            this.css(TRANSFORM,matrix.toString());

            return this;
        } else
            return getMatrixByTransform(getComputedStyle(this[0],null)[TRANSFORM]);
    };

    var run=function() {
        if(list.length) {
            animationStop=false;

            var start,
                ease,
                arr,
                flag=false,
                startTime= +new Date,
                item=list._idlePrev,
                nextItem;

            while(item!=list) {
                nextItem=item._idlePrev;
                first=item.data;

                start=Date.now()-first.startTime;
                arr=[];
                ease=first.ease;

                if(start<=first.duration) {
                    for(var i=0,n=ease.length;i<n;i++) {
                        arr.push(ease[i](start,first.from,first.to-first.from,first.duration)/100);
                    }
                    first.step.apply(first,arr);

                } else {
                    var to=first.to/100;
                    for(var i=0,n=ease.length;i<n;i++) {
                        arr.push(to);
                    }
                    first.step.apply(first,arr);

                    list._remove(item);

                    first.finish&&first.finish(to);
                }

                item=nextItem;
            }

            requestAnimationFrame(run);
        } else {
            animationStop=true;
        }
    };

    var init=function(item) {
        item.startTime=Date.now();
        item.ease=getEase(item.ease);
        item.stop=function() {
            list.remove(item);
        };
        if(item.from===void 0) item.from=0;
        if(item.to===void 0) item.to=100;
        if(!item.duration) item.duration=300;

        return item;
    }

    var parallel=function(animations) {
        for(var i=0,n=animations.length,item;i<n;i++) {
            list.append(init(animations[i]));
        }

        if(animationStop) run();
    }

    var eachStep=function(d) {
        var style,
            originStyle,
            originVal,
            val,
            newStyle;

        this.el.each(function() {
            style=this._animationStyle;
            originStyle=this._originStyle;

            if(d==0) {
                newStyle=originStyle;
            } else if(d<1) {
                newStyle={};
                for(var key in style) {
                    val=style[key];
                    originVal=originStyle[key];

                    if(key==TRANSFORM) {
                        var m=originVal.match(matrixReg)||['',1,0,0,1,0,0];
                        var i=0;
                        var m2d=getMatrixByTransform(val);

                        m2d.a=getCurrent(m[1],m2d.a,d);
                        m2d.b=getCurrent(m[2],m2d.b,d);
                        m2d.c=getCurrent(m[3],m2d.c,d);
                        m2d.d=getCurrent(m[4],m2d.d,d);
                        m2d.tx=getCurrent(m[5],m2d.tx,d);
                        m2d.ty=getCurrent(m[6],m2d.ty,d);

                        newStyle[key]=m2d.toString();

                    } else if(!isNaN(parseFloat(val))) {
                        originVal=isNaN(parseFloat(originVal))?defaultStyle[key]||0:parseFloat(originVal);
                        newStyle[key]=getCurrent(originVal,val,d);
                    } else {
                        newStyle[key]=val;
                    }
                }
            } else {
                newStyle=style;
            }

            $(this).css(newStyle);
            //console.log(this.style.cssText)
        });

        this._step&&this._step(d);
    }

    var animationEnd=function(per) {
        if(per==1) this.el.css(this.css);
        this._finish&&this._finish(per);
    }

    var prepare=function(animations) {
        var item,
            $el,
            el,
            css,
            m2d,
            origTransform;

        for(var i=0,n=animations.length;i<n;i++) {
            item=animations[i];

            if(item.css) {
                css=toTransform(item.css);
                item.matrix=css.matrix;
                item.css=css.css;

                $el=item.el=$(item.el);

                if(typeof item.start==='object') {
                    $el.transform(item.start);
                }

                $el.each(function() {
                    var el=this,
                        animationStyle={},
                        originStyle={},
                        style=getComputedStyle(el,null);

                    $.each(item.css,function(key,val) {
                        if(typeof val==='string') {
                            if(key==TRANSFORM) {
                                val=val.replace(translatePercentReg,function($0,$1,$2) {
                                    return 'translate('+($1.indexOf('%')!== -1?el.offsetWidth*parseFloat($1)/100:parseFloat($1))+'px,'+($2.indexOf('%')!== -1?el.offsetHeight*parseFloat($2)/100:parseFloat($2))+'px)';
                                });
                                //console.log(val)

                            } else if(/^(top|margin(-t|T)op)$/.test(key)) {
                                val=val.replace(percentReg,function($0) {
                                    return el.parentNode.offsetHeight*parseFloat($0)/100+"px";
                                });

                            } else if(/^(left|margin(-l|L)eft|padding(-l|L)eft|padding(-t|T)op)$/.test(key)) {
                                val=val.replace(percentReg,function($0) {
                                    return el.parentNode.offsetWidth*parseFloat($0)/100+"px";
                                });
                            }
                        }

                        originStyle[key]=style[key];
                        animationStyle[key]=val;
                    });

                    el._animationStyle=animationStyle;
                    el._originStyle=originStyle;
                    //console.log('new',animationStyle,'original',originStyle);
                });

                item._step=item.step;
                item.step=eachStep;

                item._finish=item.finish;
                item.finish=animationEnd;
            }
        }

        return animations;
    }

    var Animation=function(animations) {
        if(!$.isArray(animations)) animations=[animations];

        prepare(animations);

        this.list=animations;
    }

    Animation.prototype.step=function(percent) {
        var item,
            list=this.list;

        for(var i=0,length=list.length;i<length;i++) {
            item=list[i];
            item.from=percent;
            item.step(percent/100);
        }
        return this;
    }

    Animation.prototype.animate=function(duration,percent,callback) {
        var item,
            animations=this.list;

        for(var i=0,length=animations.length;i<length;i++) {
            item=animations[i];
            item.duration=duration;
            item.to=percent;
            item.finish=item.start=void 0;
        }

        item.finish=callback;

        parallel(animations);

        return this;
    }

    exports.Animation=Animation;

    exports.parallel=function(animations) {
        parallel(prepare(animations));
    };

    exports.animate=function(el,step,duration,ease,finish) {
        var item={
            duration: duration,
            ease: ease,
            finish: finish
        };

        if(typeof el==='function') {
            item

        } else {
            item.el=el;
        }

        parallel([item]);

        return first;
    };

    exports.animate=function() {
        var args=Array.prototype.slice.call(arguments),
            item={},
            i=0,
            el=args[i++];

        if(typeof el==='function') {
            item.step=el;

        } else {
            item.el=el;
            item.css=args[i++];
        }
        item.duration=args[i++];
        item.ease=args[i++];
        item.finish=args[i];

        parallel([item]);

        return item;
    };

    var momentum={
        step: function(d) {
            for(var i=0,n=this.momentums.length,m;i<n;i++) {
                m=this.momentums[i];
                m.current=m.start+(m.result-m.start)*d;
            }

            this.momentumStep.apply(this.ctx,this.momentums);
        },
        finish: function() {
            this.bounce();
        },
        bounce: function() {
            var count=0,
                divisor,
                current;

            for(var i=0,n=this.momentums.length,m;i<n;i++) {
                m=this.momentums[i];

                current=m.current<m.min?m.min:m.current>m.max?m.max:m.current;
                if(current!=m.current) {
                    m.start=m.current;
                    m.result=current;
                    count++;

                } else if(m.divisor&&current%m.divisor!=0) {
                    divisor=m.divisor;
                    m.start=m.current;
                    m.result=(current%divisor<divisor/2)?current-current%divisor:(current-current%divisor+divisor);
                    count++;
                }
            }

            if(count==0) {
                this.end.call(this.ctx);
            } else {
                this.duration=400;
                parallel([this]);
            }
        }
    };

    var _momentum=function(start,current,time,min,max,size,divisor) {
        var dist=current-start,
            maxDistUpper=max-current,
            maxDistLower=current-min,
            deceleration=0.0006,
            speed=Math.abs(dist)/time,
            newDist=(speed*speed)/(2*deceleration),
            newTime=0,
            outsideDist=0,
            outSpeed,
            result;

        size=divisor||size;

        if(dist>0&&newDist>maxDistUpper) {
            outsideDist=size/(6/(newDist/speed*deceleration))/2;
            maxDistUpper=maxDistUpper+outsideDist;
            speed=speed*maxDistUpper/newDist;
            newDist=maxDistUpper;
        } else if(dist<0&&newDist>maxDistLower) {
            outsideDist=size/(6/(newDist/speed*deceleration))/2;
            maxDistLower=maxDistLower+outsideDist;
            speed=speed*maxDistLower/newDist;
            newDist=maxDistLower;
        }

        newDist=newDist*(dist<0?-1:1);
        outsideDist=outsideDist*(dist<0?-1:1);
        newTime=speed/deceleration;
        result=current+newDist;

        if(outsideDist!=0) {
            outSpeed=(0.15/(outsideDist/newDist));
            if(outSpeed>1) {
                newDist-=outsideDist;
                outsideDist/=outSpeed;
                newDist+=outsideDist;
                result=current+newDist;
            }
        }

        if((current<min&&result<min)||(current>max&&result>max))
            newDist=0,newTime=0,outside=0,result=current;

        else if(divisor&&outsideDist==0) {
            result=result%divisor==0?result:(result%divisor<divisor/2)?result-result%divisor:(result-result%divisor+divisor);
            result=result>max?max:result<min?min:result;
            if(newTime<300||newTime>400) newTime=300;
            newDist=result-current;
        }

        return { dist: newDist,time: Math.round(newTime),outside: outsideDist,result: result,current: current,start: current,max: max,min: min,divisor: divisor };
    }

    exports.momentum=function(options,maxDuration,step,ease,end,context) {
        var momentums=[],
            anim={},
            newDuration=0;

        if(typeof options[0]==='number') options=[options];
        else if(!options.length) { end.call(context);return; }

        for(var i=0,n=options.length,m;i<n;i++) {
            m=_momentum.apply(this,options[i]);

            if(m.dist!=0) newDuration=Math.max(newDuration,m.time);
            momentums.push(m);
        }

        for(var i=0,n=momentums.length,m;i<n;i++) {
            m=momentums[i];
            if(m.outside!=0) m.result=m.result-m.outside+m.outside*400/newDuration;
        }

        $.extend(anim,momentum,{
            ctx: context||anim,
            momentums: momentums,
            momentumStep: step,
            duration: newDuration,
            ease: ease,
            end: end
        });

        if(newDuration!=0) {
            if(maxDuration&&anim.duration>maxDuration) anim.duration=maxDuration;
            parallel([anim]);
        } else {
            anim.bounce();
        }

        return anim;
    };
});
