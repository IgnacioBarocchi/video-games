create 3rdperson character pkg
abs Character
conc BipedCharacter(machine)
conc CarCharacter

biped fed:
controls LMB (gun) RMB (maul) space (dash) shift (sprint)

OK: added character pkg to car game FED (nice)
add handlers (collision)
update car scale to match 1:1
re-model road to match 1:1 scale
add front of the car cuboid collider (handled to crash zombies)
add rest of the car cuboid collider (dumb)
