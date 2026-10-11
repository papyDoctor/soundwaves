# A closed loudspeaker box, 30 cm deep and 15 cm in radius, with a 10 cm
# membrane on its front, radiating into free air (an open half-disc).
# Axisymmetric. At 2 kHz, ka is about 3.7: the ring shows the beaming.
soundwaves 1
units m
mode axisym
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=sine f0=2000 amp=0.01
polyline box closed material=rigid
    -0.3 0   0 0 @drive   0 0.1 @rigid   0 0.15   -0.3 0.15
line axis -1.2 0 1.2 0 material=rigid
arc sky 0 0 1.2 0 180 material=open
region air 0.5 0.5 medium=air
ring pattern 0 0 1 n=37 a0=0 a1=180
probe axis_probe 0.8 0
sim fmax=4000 npl=8 duration=0.01 cfl=0.9 angle=28
view center=0,0.6 scale=200 colormap=rwb gain=auto grid=0.05
