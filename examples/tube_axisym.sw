# A 1 m long tube, 5 cm radius, closed by a piston on the left and open on the
# right. Axisymmetric: x runs along the axis, y is the radius; the wall must
# come back to the axis, whose segment is recognised automatically.
soundwaves 1
units m
mode axisym
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=burst f0=1500 amp=0.01 cycles=3
polyline tube material=rigid
    0 0.05   1 0.05 @open   1 0 @rigid   0 0
line piston 0 0 0 0.05 material=drive
region air 0.5 0.025 medium=air
probe near 0.25 0.02
probe far 0.75 0.02
sim fmax=4000 npl=10 duration=0.006 cfl=0.9 angle=28
view center=0.5,0.05 scale=900 colormap=rwb gain=auto
