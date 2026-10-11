# Two 4 x 4 m rooms with a 1 m door between them: the partition is a thin
# wall drawn inside the air (two line segments), the gap is the door. A pulse
# in the left room; probes in both. Close the door by joining the two lines.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material carpet absorb alpha=0.3
rect rooms 0 0 8 4 material=rigid
line wall_low 4 0 4 1.5 material=rigid
line wall_high 4 2.5 4 4 material=rigid
line floor_pad 1 0 3 0 material=carpet
region air 2 2 medium=air
source s1 point 1 2 signal=ricker f0=300 amp=1
probe left 2 1
probe right 6 2
sim fmax=1500 npl=8 duration=0.05 cfl=0.9 angle=28
view center=4,2 scale=90 colormap=rwb gain=auto grid=0.1
