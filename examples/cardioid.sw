# Directivity at low frequency without a big mouth: a gradient pair. Two
# point sources 10 cm apart, the rear one inverted (amp=-1) and delayed by the
# travel time d/c = 0.29 ms. Backwards the two cancel, forwards they add: a
# cardioid, nearly the same shape from 200 Hz to 800 Hz (Map tab), while a
# single 10 cm source would be omnidirectional there. The price is level,
# which drops 6 dB per octave towards the bass. The spacing sets the top of
# the useful band: d must stay under a quarter wavelength (860 Hz here); at
# d = λ/2 (1.7 kHz) the front cancels and lobes appear. See cardioid_voice.sw
# for a 3 cm pair that holds up to 3.5 kHz.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material open open
circle field 0 0 1.5 material=open
region air 0.5 0.5 medium=air
source front point 0.05 0 signal=ricker f0=1000 amp=1 t0=0.0015
source rear point -0.05 0 signal=ricker f0=1000 amp=-1 t0=0.00179
ring pattern 0 0 1.2 n=72
probe ahead 1 0
probe behind -1 0
sim fmax=2500 npl=8 duration=0.012 cfl=0.9 angle=28
view center=0,0 scale=200 colormap=rwb gain=auto grid=0.05
