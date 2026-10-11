# A short tube (radius 20 cm) driven by a piston at its closed end, opening
# into a large box whose walls are all open (free field). Two absorbing panels
# float near the mouth. Axisymmetric: x along the axis, y the radius.
soundwaves 1
units m
mode axisym
medium air c=343 rho=1.2
material rigid rigid
material panel absorb alpha=0.6
material open open
material drive piston signal=sine f0=2000 amp=0.01
rect box -1.5 0 3 1.5 material=open
line piston -0.7 0 -0.7 0.2 material=drive
line tube -0.7 0.2 0.09 0.2 material=rigid
line panel1 -0.1 0.23 0.2 0.23 material=panel
line panel2 -0.05 0.26 0.5 0.26 material=panel
region air 1 0.7 medium=air
ring pattern 0.1 0 1 n=37 a0=0 a1=180
sim fmax=3000 npl=8 duration=0.012 cfl=0.9 angle=28
view center=0,0.75 scale=120 colormap=rwb gain=auto grid=0.01
