﻿<style>
    .db_toolbar { position: fixed; top: 0px; padding: 5px 10px; left: 210px; right: 0px; height: 60px; display: -webkit-box; background: #fff; border-bottom: 1px solid #ddd; }
    .db_toolbar textarea { display: block; -webkit-box-flex: 1; margin-left: 10px; height: 100%; box-sizing: border-box; }
    .db_con { margin-top: 60px; }
    .datatable { min-width: 100%; }
    .datatable td { padding: 5px; }
</style>
<div class="main">
    <div class="db_toolbar">
        <select sn-model="database" value="{{database}}">
            <option sn-repeat="item in databases">{{item.Database}}</option>
        </select>
        <textarea sn-model="query"></textarea>
    </div>
    <div class="db_con">
        <table class="datatable">
            <thead>
                <tr>
                    <th sn-repeat="item in columns">{{item.key}}</th>
                </tr>
            </thead>
            <tbody>
                <tr sn-repeat="data in result">
                    <td sn-repeat="item in columns">{{data[item.key]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
