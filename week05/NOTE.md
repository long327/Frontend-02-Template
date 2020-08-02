浏览器工作原理总结
	1.url(HTTP)
	2.html(parse)
	3.dom(css computing)
	4.dom with css(layout)
	5.dom with position(render)
	6.bitmap

css computing
	一、
	1.遇到style标签时，我们把css规则保存起来
	2.这里我们调用css parser来分析css规则
	3.这里我们必须要仔细研究此库分析css规则的规格
	二、
	1.当我们创建一个元素后，立即计算css
	2.理论上，当我们分析一个元素时，所有css规则已经收集完毕
	3.在真实的浏览器中，可能遇到写在body的style标签，需要重新css计算的情况，这里我们忽略
	三、
	1.在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
	2.我们从上一步骤的stack，可以获取本元素所有父元素
	3.因为我们首先获取的是‘当前元素’，所以我们获得和计算父元素匹配的顺序是从内向外
	四、
	1.选择器也要从当前元素向外排列
	2.复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列
	五、
	1.根据选择器的类型和元素属性，计算是否与当前元素匹配
	2.这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
	六、
	1.一旦选择匹配，就应用选择器到元素上，形成computedStyle
	七、
	1.specificity
		[0, 0, 0, 0]
		['inline', 'id', 'class', 'tag']
	2.css规则根据specificity和后来优先规则覆盖
	3.specificity是一个四元组，越在左边权重越高
	4.一个css规则的specificity根据包含的简单选择器相加的属性
	八、
	width height left right top bottom属性给抽象成了main cross相关的属性
	九、
		分行
			1.根据主轴尺寸，把元素分进行
			2.如设置了no-wrap，则强行分配一行
	十、
		计算主轴方向
			1.找出所有flex元素
			2.把主轴方向的剩余尺寸按比例分配给这些元素
			3.如剩余空间为负数，所有flex元素为0，等比压缩剩余空间
	十一、
		计算交叉轴方向
			1.根据每一行中最大元素尺寸计算行高
			2.根据行高flex-align和item-align确定元素具体位置
绘制
	1.绘制需要依赖一个图形环境
	2.我们这里采用了npm包images
	3.绘制在一个viewport上进行
	4.与绘制相关的属性：background-color、border、background-images等
