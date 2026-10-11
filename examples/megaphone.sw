# A megaphone for the voice band: a 2 cm throat driven by a short pulse that
# covers 500 to 3500 Hz, a conical horn to a 12 cm mouth, free air around.
# One run, then the Probes panel's Map tab shows the radiation diagram at
# every frequency of the band (angle across, frequency up), and Pattern with
# "spectrum at" gives the diagram at one frequency.
soundwaves 1
units cm
mode axisym
medium air c=343 rho=1.2
material rigid rigid
material open open
material drive piston signal=ricker f0=1800 amp=0.02
line throat 0 0 0 2 material=drive
polyline horn material=rigid
    0 2   10 3.5   20 6   30 12
line baffle 30 12 30 120 material=rigid
arc sky 30 0 120 0 90 material=open
line axis 0 0 150 0
region air 15 3 medium=air
ring pattern 30 0 100 n=37 a0=0 a1=90
probe mouth 30 5
sim fmax=9000 npl=8 duration=0.009 cfl=0.9 angle=28
view center=60,30 scale=6 colormap=rwb gain=auto grid=5
