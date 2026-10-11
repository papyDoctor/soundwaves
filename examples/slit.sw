# Diffraction through a slit: a wide piston on the left sends a plane wave
# at a rigid screen with a 10 cm opening; everything else is open. At 2 kHz
# the wavelength is 17 cm, larger than the slit, so the wave spreads out
# behind it: the ring shows how evenly.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=sine f0=2000 amp=0.01
polyline field closed material=open
    0 0   2 0   2 2   0 2 @drive
line screen_low 1 0 1 0.95 material=rigid
line screen_high 1 1.05 1 2 material=rigid
region air 0.5 1 medium=air
ring pattern 1 1 0.8 n=49 a0=-80 a1=80
sim fmax=4000 npl=8 duration=0.012 cfl=0.9 angle=28
view center=1,1 scale=180 colormap=rwb gain=auto grid=0.05
