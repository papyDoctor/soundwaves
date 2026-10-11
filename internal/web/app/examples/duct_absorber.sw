# A 3 m duct, 20 cm wide, driven by a piston at the left and open at the
# right. Between x = 1 and x = 2 both walls are lined with an absorber: the
# probes before and after the lining show the attenuation. Set alpha to 0 to
# hear the difference.
soundwaves 1
units m
mode planar
medium air c=343 rho=1.2
material rigid rigid
material lining absorb alpha=0.8
material open open
material drive piston signal=burst f0=1500 amp=0.01 cycles=4
polyline duct closed material=rigid
    0 0   1 0 @lining   2 0 @rigid   3 0 @open   3 0.2 @rigid   2 0.2 @lining   1 0.2 @rigid   0 0.2 @drive
region air 0.5 0.1 medium=air
probe before 0.5 0.1
probe after 2.5 0.1
sim fmax=3000 npl=10 duration=0.015 cfl=0.9 angle=28
view center=1.5,0.1 scale=250 colormap=rwb gain=auto grid=0.05
