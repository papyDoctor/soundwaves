# The gradient pair sized for the voice band: 3 cm apart, so that d stays
# under a quarter wavelength up to 3 kHz (d < λ/4 is the rule: at d = λ/2 the
# front cancels). Rejection behind holds at 30 dB or more from 500 to 3500 Hz;
# the side drifts from -6 dB at 1 kHz to -1 dB at 3.5 kHz. The price of the
# small spacing: less output towards the bass. The map's band is 500-3500 Hz.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material open open
circle field 0 0 0.6 material=open
region air 0.3 0.2 medium=air
source front point 0.015 0 signal=ricker f0=1800 amp=1 t0=0.001
source rear point -0.015 0 signal=ricker f0=1800 amp=-1 t0=0.0010875
ring pattern 0 0 0.5 n=72
probe ahead 0.4 0
probe behind -0.4 0
sim fmax=9000 npl=8 duration=0.006 cfl=0.9 angle=28
view center=0,0 scale=450 colormap=rwb gain=auto grid=0.01
