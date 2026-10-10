# A flaring horn in an infinite baffle, radiating into free air: a driver at
# the throat on the left, the mouth at x = 50, and an open quarter-sphere of
# air around it (the far field leaves through the arc). Axisymmetric, in cm.
soundwaves 1
units cm
mode axisym
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=burst f0=2000 amp=0.02 cycles=4
line throat 0 0 0 2 material=drive
polyline horn material=rigid
    0 2   8 2.4   16 3.3   24 4.8   32 7.2   40 11   46 15.5   50 20
line baffle 50 20 50 70 material=rigid
arc sky 50 0 70 0 90 material=open
line axis 0 0 120 0
region air 30 5 medium=air
probe mouth 50 10
probe outside 90 10
ring pattern 50 0 55 n=19 a0=0 a1=90   # the radiation diagram, 5° apart, in front of the baffle
sim fmax=5000 npl=8 duration=0.005 cfl=0.9 angle=28
view center=60,30 scale=8 colormap=rwb gain=auto
