学习笔记

一、 html定义：xml与sgml
	 1. DTD与XML namespace
	 2.HTML语义化
	 	1）文本实体由 & 开头，; 结尾。如 &lt；
		2）文本实体可以用#后跟一个十六进制数字，表示字符的 ASCII 值
			&#97；=> a
		3）规定的比较重要的转义字符
			nbsp: no-break space
			用它连接的两个词会被认为是一个词
			要想要多个空格，应使用 CSS 的 white-space
			quot: 双引号
			amp: & 符号
			lt: < 符号
			gt: > 符号
		4）语义化使用 HTML 标签
			<aside> 定义 article 以外的内容（非主体内容）。aside 的内容应该与 article 的内容相关。
			<main> 主题部分，只有一个。
			<article> 主要内容。
			<hgroup> 包含主标题副标题。
			<hr> 段落之间切换内容。
			<abbr> 缩写
			加粗
			<strong> 强调该词在段落中的重要性
			<em> 语调中的重音，重读。如一个苹果\一个苹果
			图表+说明文字的标签组
			<figure> 外层
			<img>
			<figcaption> 放说明文字
			列表
			<ol> 与 <ul> 的区别是，列表内容在语义上是否有顺序性
			可以用 CSS 的 counter 把 <ol> 里的 <li> 前的数字变成圆点
			可嵌套
			<nav> 导航
			<footer> article 中也可以有自己的 header 和 footer
			<dfn> 表示给某词下定义。The term <dfn>Internet<dfn> is ...
			<samp> 表示是示例
			<pre> 表示预先调整好格式的一段文本
			<code>
			没有合适的标签，如注记，可以配合class： <p class="note">
		5）HTML 中的合法元素
			element: <tagname></tagname>
			text
			comment: <!-- comments -->
			DocumentType: <!Doctype html>
			ProcessingInstruction: <?a 1?>
			CDATA: <![CDATA[]]> 文本的另一种语法，其中不用考虑转义
二、DOM API
	1. node 部分
		导航类操作
		节点的导航
		元素的导航 （避免空白文本节点的干扰）
		Node	Element
		parentNode	parentElement
		childNodes	children
		firstChild	firstElementChild
		lastChild	lastElementChild
		nextSibling	nextElementSibling
		previousSiblilng	previousElementSibling
		提供在 DOM 树中自由移动的能力
		parentNode 和 parentElement 重复，因为 非element 的 node 是不会有子节点的。
		DOM 的 collection 是 living collection。引用是保持的。
	2.修改操作
		插入
			appendChild
			insertBefore
		这两个搭配，可以插入任意位置。如，有 10 个子节点，形成 11 个可以插入的空隙。insertBefore 可以插前十个，appendChild 可以插第十一个（尾部）。

		如果用 appendChild 移动一个 DOM 树中已经存在的节点，该节点会自动先从原位置被 remove，在 append 到相应位置。

		删 removeChild
		换 replaceChild （相当于 一次 remove + 一次 insert）
	3.高级操作
		compareDocumentPosition: 比较两个节点的关系。可以得到“前后”的关系。
		contains 检查一个节点是否包含另一个节点。
		isEqualNode 检查两个节点是否相同，只要 DOM 树结构相同即可，可以用来检查树形结构。
		isSameNode 不然直接用 ===
		cloneNode 复制节点。如果传入参数 true，会做深拷贝（连同子元素）。