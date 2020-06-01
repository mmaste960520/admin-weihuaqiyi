@echo off

::define variables
set var=%~dp0
set var=%var:~,-1%

::14
set current_time_HH=%time:~0,2%
if "%current_time_HH%" lss "10" (set current_time_HH=0%time:~1,1%) else (set current_time_HH=%time:~0,2%)
::20190312095654
set current_time_long=%date:~0,4%%date:~5,2%%date:~8,2%%current_time_HH%%time:~3,2%%time:~6,2%
::14:18:56
set current_only_time=%current_time_HH%:%time:~3,2%:%time:~6,2%
::2019/03/12-14:18:56
set current_date1=%Date:~0,4%/%Date:~5,2%/%Date:~8,2%-%current_only_time%
::2019/03/12 14:18:56
set current_date2=%Date:~0,4%/%Date:~5,2%/%Date:~8,2% %current_only_time%

::define project variables by custom
set company=渭华起义
set product=后台管理
set service=前端
set action1=安装插件
set action2=编译打包
set action3=运行服务
set bkcolour1=A0
set bkcolour2=B0
set bkcolour3=C0
