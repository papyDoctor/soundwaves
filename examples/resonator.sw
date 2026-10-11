# A Helmholtz resonator on the side of a duct: a 20 x 20 cm cavity behind a
# 2 cm neck. A short pulse goes down the duct; the probe in the cavity keeps
# ringing at the resonance (about 150 Hz here) long after the pulse is gone.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=gauss f0=400 amp=0.01
polyline duct closed material=rigid
    0 0   1 0 @open   1 0.1 @rigid   0.51 0.1   0.51 0.15   0.6 0.15   0.6 0.35   0.4 0.35   0.4 0.15   0.49 0.15   0.49 0.1   0 0.1 @drive
region air 0.2 0.05 medium=air
probe in_duct 0.8 0.05
probe cavity 0.5 0.25
sim fmax=6000 npl=8 duration=0.06 cfl=0.9 angle=28
view center=0.5,0.17 scale=600 colormap=rwb gain=auto grid=0.01
