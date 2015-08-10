<header>
    <div class="head_back" sn-binding="data-back:back"></div>
    <div sn-binding="html:title" class="head_title"></div>
</header>
<div class="main scrollview">
    <div class="member">
        <dl class="member_info">
            <dt>登录名</dt>
            <dd></dd>
            <dt>姓名</dt>
            <dd><input sn-binding="value:user.Address" sn-model="formData.name" /></dd>
            <dt>性别：</dt>
            <dd>
                <span class="radio" member="gender" value="男" sn-binding="class:user.Gender|case:'男':'checked radio':'radio'">男</span>
                <span class="radio" member="gender" value="女" sn-binding="class:user.Gender|case:'女':'checked radio':'radio'">女</span>
            </dd>

            <dt>生日</dt>
            <dd><input sn-binding="value:user.BirthDay" sn-model="formData.birthDay" /></dd>
            <dt>所在地</dt>
            <dd><input sn-binding="value:user.Address" sn-model="formData.address" /></dd>

            <dt>家庭人数</dt>
            <dd><input sn-binding="value:user.Address" sn-model="formData.address" /></dd>

            <dt>是否有小孩：</dt>
            <dd>
                <span class="radio" member="gender" value="1" sn-binding="class:user.Gender|case:'男':'checked radio':'radio'">是</span>
                <span class="radio" member="gender" value="0" sn-binding="class:user.Gender|case:'女':'checked radio':'radio'">否</span>
            </dd>

            <dt>小孩生日</dt>
            <dd><input sn-binding="value:user.BirthDay" sn-model="formData.birthDay" /></dd>
        </dl>
        <div class="member_bar">
            <b class="btn_mid">修改</b>
            <b class="btn_cancel">取消</b>
        </div>
    </div>
</div>
