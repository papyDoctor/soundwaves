# A symmetric hall, 12 x 8 m, with two columns and an absorbing back wall:
# only the right half is drawn, the left edge is a symmetry line. The viewport
# mirrors the field; the physics is exact (a mirror is a rigid wall for p).
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material mirror symmetry
material back absorb alpha=0.7
polyline hall closed material=rigid
    0 0   6 0   6 8 @back   0 8 @mirror
circle col1 3 2.5 0.3
circle col2 3 5.5 0.3
region air 1 1 medium=air
source s1 point 0 1.5 signal=ricker f0=400 amp=1
probe p1 4 6.5
probe p2 1 4
sim fmax=1500 npl=10 duration=0.04 cfl=0.9 angle=28
view center=0,4 scale=50 colormap=rwb gain=auto
