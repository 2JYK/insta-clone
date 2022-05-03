import aifc

####################################################################
# class

class Circle():
    pi = 3.14

    def __init__(self, radius):
        self.radius = radius
        self.area = radius * radius * self.pi

    def getCircumference(self):
        circumference = self.radius * 2 * self.pi
        return circumference

c = Circle(5)
c2 = Circle (10)
c3 = Circle (20)

print('반지름은 : ',c.radius)
print('넓이는 : ',c.area)
print('둘레는 : ',c.getCircumference())


print('반지름은 : ',c3.radius)
print('넓이는 : ',c3.area)
print('둘레는 : ',c3.getCircumference())

print('반지름은 : ',c2.radius)
print('넓이는 : ',c2.area)
print('둘레는 : ',c2.getCircumference())

a=()

print()
