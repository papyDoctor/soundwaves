# A 6 x 4 m room seen from above, walls extruded. An absorbing panel and an
# open door on the right wall, a pillar and a round column inside.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material panel absorb alpha=0.6
material door open
polyline room closed material=rigid
    0 0   6 0   6 1 @panel   6 3 @door   6 3.9 @rigid   6 4   0 4
rect pillar 2.5 1.5 0.5 0.5
circle column 4.5 3 0.3 material=panel
region air 1 1 medium=air
source s1 point 1 2 signal=ricker f0=600 amp=1
probe p1 5 2
probe p2 3 3.5
sim fmax=2000 npl=10 duration=0.03 cfl=0.9 angle=28
view center=3,2 scale=120 colormap=rwb gain=auto
