[GitHub地址请戳我](https://github.com/JacarandaStu/cuple-project.git)

[B站视频链接请戳我](https://bilbil.com/……)

# 一、结对探索（4分）

## 1.1 队伍基本信息（1分）

 结对编号：49；队伍名称：人工弱智；

| 学号      	| 姓名 	| 作业博客链接		| 具体分工		|
| --------- |:-----:|:-----------------:|:-------------:|
| 032004109 | 李焯春	| [点击这里](https://github.com/JacarandaStu/cuple-project.git) |对局流程设计、原型设计、素材收集、AI启发算法 |
| 032004118 | 林展	|[点击这里](https://github.com/JacarandaStu/cuple-project.git)|布局设计、AI实现、前端搭建|

## 1.2 描述结对的过程（1分）
- 就在隔壁宿舍，离得比较近，便于沟通交流，同时在个人编程作业的时候有交流讨论过。
- 于是就早早的做了结队的打算，只不过困于起队名等了几天才填表格。

## 1.3 非摆拍的两人在讨论设计或结对编程过程的照片（2分）

# 二、原型设计（16分）

## 2.1 原型工具的选择（2分）
- 我们小组选择了即刻设计这一个软件作为原型设计工具，原因如下：
1. 中文环境，更亲近国内用户；
2. 可以导出CSS样式代码；
3. 支持国产，避免遭遇可能发生的软件封禁；
4. Free

这里附上参考链接：*[即时设计，是怎样一款软件](https://zhuanlan.zhihu.com/p/486195949)*

## 2.2 遇到的困难与解决办法（3分）

- **遇到的困难：**
> 初次接触原型设计，两人研究操作界面研究了半天，各种功能都用的不是很顺手。比如说用以构图的元素从何而来、交互如何创建等等都一窍不通。

> 其次就是初次碰到这种开发项目，纠结了好久是要做手机端还是电脑端，因为全都是0基础，学习成本都比较大。

- **解决办法：**
> 对于第一个问题，只能说是熟能生巧，在我们一起探讨摸索下，一步步掌握了设计平台提供的各种功能模块，把原型设计成了总算能看得过去的程度了。
> 虽然学习的过程十分累人，也延长了原型设计的时间战线，但是最后能够做到理想的样子还是十分快乐的。

> 对于第二个问题，最后的解决办法是权衡了下两个环境下开发游戏的学习成本，通过浏览往年的范例作业，最终敲定了做网页端。
> ps：其实还有个小细节是林同学刷到过一个视频，视频里提到的移动端的自闭性给他留下不小的印象。

## 2.3 原型作品链接（5分）

 [原型作品预览](https://js.design/f/98OcGd)
 
 (注：在此链接打开的网页内点击右上方的播放形状的标签就可以进入交互模式辣~)

## 2.4 原型界面图片展示（6分）

1. **游戏加载界面**，设计了加载的样式。<br />里面用了些小伎俩让本界面有了动画效果的同时还能进行界面跳转（循环跳转+焦点移出））:<br>![加载界面](/images/loading.PNG)
2. **游戏主界面**，综合所有模块于一体的中心部分：<br>![主界面](/images/index.PNG)<br />
这里简单介绍下这张图里包含的各个功能组件：
 - **更换头像**：点击头像框即可触发，里面提供了些样式，可以水平滑动头像列表来看更多头像样式。
 - **更改昵称**：点击昵称栏即可触发，用字符I代替了光标，原型里无法交互。
 - **规则介绍**：点击“规则”按钮便可弹出规则窗口，这里直接搬走了评测组博客里的规则图片进行展示，可下拉。
 - **更多骰子**与**更多棋盘**：下面会介绍，这里便不赘述。
 - **在线对战匹配窗口**：如图所示，点击开始匹配后会有些样式上的变化，如开始匹配按钮变暗。
3. **人机对战界面**，大致是将三个模式的游戏界面融合到了一体，不同模式只需要进行一些微小变动：<br>![人机对战](/images/NVP.PNG)
4. **双人对战+结算展示界面**,随便模拟了个残局，没做交互，只能像PPT一样点点点：<br>![双人对战](/images/双人对战.png)
5. **商店模块**，微不足道的创新点，万恶的小游戏必备的皮肤销售环节(虽然原型里换不了)：<br>![商店-骰子](/images/更多骰子.png)![商店-棋盘](/images/更多棋盘.png)

# 三、编程实现（14分）

## 3.1 网络接口的使用（2分）
> 计划没有安排好，后端的队友没来得及学习完Flask框架
## 3.2 代码组织与内部实现设计（类图）（2分）
![part1](/images/code/css_img.png)
![part2](/images/code/js_html.png)
![part3](/images/code/index_html.png)
![part4](/images/code/index_js_css.png)
![part5](/images/code/pk_part.png)
## 3.3 说明算法的关键与关键实现部分流程图（2分）
> ai用了简单的决策.该方法是基于使分数差值（我的分数-对手分数）最大化的基准<br>
>我们落子其实只有三种决策：1，2，3行，
>只要遍历一下这三种决策，找到使分数差值变得更大的就行了。<br>
>如果存在分差相同的状况就随机选择一种。<br>
>![ai决策](/images/ai决策.png)
## 3.4 贴出重要的/有价值的代码片段并解释（2分）
**前端部分的若干重要代码片段**
1. 前端复现的选择函数（一般方法）
> ![choose1](/images/code/choose1.png)
> ![choose2](/images/code/choose2.png)
> ![choose3](/images/code/choose3.png)
2. 托管功能的具体实现
> ![AI1](/images/code/AI1.png)
> ![AI2](/images/code/AI2.png)
> ![AI3](/images/code/AI3.png)
3. 吃子操作处理逻辑
> ![eat1](/images/code/eat1.png)
> ![eat2](/images/code/eat2.png)
4. 计算分值
> ![countScore](/images/code/countScore.png)
## 3.5 性能分析与改进（2分）
> 由于完全由前端部分构成，没实现前后端交互，所以不晓得怎么测试性能...
## 3.6 单元测试（2分）
> 啊...这里也是空的呢...
## 3.7 贴出GitHub的代码签入记录，合理记录commit信息（2分）

# 四、总结反思（11分）

## 4.1 本次任务的PSP表格（2分）

| PSP2.1 	| Personal | Software Process Stages | 预估耗时（分钟）	| 实际耗时(分钟)	|
|:---------:|:--------:|:-----------------------:|:----------------:|:-------------:|
| Planning	| 计划	| 	| 60	|	|
| Estimate	| 估计这个任务需要多少时间	|	 | 60	|	|	
| Development	| 开发	|	|	3000 |	|
| Analysis	| 需求分析 (包括学习新技术)	|	| 40	|	|
| Design Spec	| 生成设计文档	|	|	60 |	|
| Design Review	| 设计复审	|	|	60 |	|
| Coding Standard	| 代码规范 (为目前的开发制定合适的规范)		|	| 20	|	|
| Design	| 具体设计	|	|	180 |	|
| Coding	| 具体编码	|	|	1000 |	|
| Code Review	| 代码复审	|	| 120	|	|
| Test	| 测试（自我测试，修改代码，提交修改）	|	|	180 |	|
| Reporting	| 报告	|	|	120 |	|
| Test Report	| 测试报告	|	|	10 |	|
| Size Measurement	| 计算工作量		|	| 30	|	|
| Postmortem & Process Improvement Plan	| 事后总结, 并提出过程改进计划		|	| 40	|	|
| Sumarize	| 合计	|	|	|	|
## 4.2 学习进度条（每周追加）（2分）

林展：

| 第N周	| 新增代码（行）	| 累计代码（行）	| 本周学习耗时(小时)	| 累计学习耗时（小时）	| 重要成长	|
|:-----:|:-------------:|:-------------:|:-----------------:|:---------------------:|:---------:|
| 1	| 0	|	0 | 31	| 31	|	 了解了HTML5的框架、掌握了部分CSS样式的设计、掌握了原型设计工具的基本功能  |
| 2	|	2400+ | 2400+	|	22 | 53	| 完成了css部分知识的学习，准备上手js，根据所学内容尽可能尝试还原了游戏的静态界面	|
| 3	|	600+ |	3000+ |	24 |	77 | 看完JS教程后学到了用啥搜啥的思维，虽然还用不太熟，但是还是尽力把绝大部分功能实现了出来	|
<hr />
李焯春：

| 第N周	| 新增代码（行）	| 累计代码（行）	| 本周学习耗时(小时)	| 累计学习耗时（小时）	| 重要成长	|
|:-----:|:-------------:|:-------------:|:-----------------:|:---------------------:|:---------:|
| 1	| 0	|	0 | 28	| 28	|	 掌握了原型设计工具的基本功能，了解了部分游戏机器人的知识，思考了此游戏的对战策略 |
| 2	|	201|	201|	15|	43|写了模拟对战，方便写对战决策并评估，但能力不够，鼓捣了很久也没写出什么好的策略|
| …	|	|	|	|	|学习后端框架，最后直接摆烂了	|
## 4.3 最初想象中的产品形态、原型设计作品、软件开发成果三者的差距如何？（2分）
> 我会在视频里进行原型和实现后的网页的对比，然后在这里也说说差距之所在。<br />
> **首先**，最初的形象中的产品形态就是跟平时自己玩的游戏一样，功能齐全，色彩饱满；<br />
> **但是**，到了原型设计环节，由于各种素材都得自己搜集，还有平台提供的交互功能有限，所以在尽量做到了功能齐全和色彩饱满之后，剩下的就没办法了；<br />
> **最后**，实现环节。emmm，一言难尽，本来以为看完前端教程就能嘎嘎乱写代码，然后走上人生巅峰，结果视频教程还是太粗糙了，在JS部分屡屡碰壁，<br />
> 阉割了部分功能。而且后端交互没写，一些类似账号提供的固定昵称，游戏场数什么的就没法保存，所以最后只能说是做完了游戏的最基本功能（也没联机功能）。

## 4.4 评价你的队友（2分）

林展：
队友焯春于我来说，是个萌新，但也不赖，可以实现我所需要的素材设计以及AI部分的设计、实现与测试改进。
虽然第一次合作还不是那么地顺利，比如在原型设计方面，我们两人一起构建，但没有约定好一个统一的规范，
导致我在写前端部分的过程不得不回过头去调整了几次原型样式。

此外，他不多说话，但有事便肯做，好几次在背地里完成一些我意想不到的内容，还是很令人感动的。

最后我想对他的性格方面进行些评价，感觉焯春同学太过于腼腆，不怎么爱说话，不管是熟人还是陌生人，希望他未来可以勇于表达自己的想法，变得更加开朗。
<hr>
李焯春：
这次作业展哥真的不容易。他在这次作业完全是一个leader的角色，从工作流程到工作要求等各个方面都是他制定的。我技术方面很差，
所以展哥做了绝大部分的工作，经常加班加点，我只是做了点材料工作，本来是打算让我做后端的，但最后因为各种原因阉割了联网部分，
基本游戏内容都是前端实现，最后几天基本就是摸鱼了，可以说比较羞愧吧。<br>
最后说几句，展哥学习能力强，做事思路清晰，真的是一个很值得信赖的人，非常感谢展哥能带我！:)

## 4.5 结对编程作业心得体会（3分）
林展：一个字：*赶！*<br />
最大的问题就是我们没有接触过前端，以及其与后端的交互，学习成本以下就上去了几个档次；<br />
其次，中途不止软工需要花时间去学习，这学期各种实践课，作业层出不穷，总体能分配的时间根本不允许我做好所有内容;<br />
最后，表达下个人的不满，感觉时间的安排太过紧凑，一波未平，一波又起，而且额外学习了的内容在未来也未必会用到，看着隔壁软工班级的作业我直接馋哭了...<br />
但是，也有收获，实现了大一以来做小游戏的夙愿，以及在学习过程了解到JS对后端的重要意义。<br />
最后的最后，作业磨平了我的心性，没有在长假花时间刻苦学习的我早被拉开了大段差距，低下的效率、对各种工具模板的无知，都是很大的问题。
<hr>
李焯春:这次作业真的是从期望满满到最后摆烂。个人能力还是差了，也没有做太多事。<br>
收获的话就是以后一定干活要做好规划吧，什么时间做什么事。值得一提的是最后看到成果还是有点小高兴的。
