# A free-standing plate, 30 cm tall, vibrating in open air: a loudspeaker
# cone without a box. Both faces move together (sides=plate): what one face
# pushes the other pulls, and the pattern is a figure of eight with a null in
# the plane of the plate. Change sides to both for a breathing membrane.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material open open
material drive piston signal=sine f0=1000 amp=0.01 sides=plate
circle field 0 0 1.5 material=open
line plate 0 -0.15 0 0.15 material=drive
region air 0.5 0.5 medium=air
ring pattern 0 0 1.2 n=72
probe front 0.8 0
probe side 0 0.8
sim fmax=2500 npl=8 duration=0.02 cfl=0.9 angle=28
view center=0,0 scale=200 colormap=rwb gain=auto grid=0.05
