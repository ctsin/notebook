# 《SVG 精髓》

P74

使用四条线绘制矩形和使用closepath 命令绘制矩形还有另外一个区别。当关闭路径时，开始线和结束线会被连接到一起，形成一个有样式的连续形状。如果使用粗笔画或者设置stroke-linecap 以及stroke-linejoin 效果，区别就很明显了。

P75

命令都使用大写字母表示，并且坐标都被假定为绝对坐标。如果使用小写命令字
母，坐标会被解析为相对于当前的画笔位置。