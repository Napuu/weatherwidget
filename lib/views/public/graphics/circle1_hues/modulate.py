from subprocess import call
#call("convert li_icon.png -modulate 100,100,0 test.png".split(" "))
for i in range(0, 101):
    com = "convert circle1.png -modulate 100,100," + str(float(100) + float(100/3) * float(float(i) / 100)) + " circle1_" + str(i) + ".png"
    print(com)
    call(com.split(" "))
