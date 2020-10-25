#KW created this code script
#HJ reviewed and revised this code script
#KW is ultimately responsible for this code script

rm(list = ls())
dev.off()
data = read.csv("BodyFat.csv")

plot(data$BODYFAT,1/data$DENSITY,type = 'n',xlab = "BODYFAT",ylab = "1/DENSITY", xaxt = 'n', yaxt = 'n')
axis(1, cex.axis = 0.8)
axis(2, cex.axis = 0.8)
text(data$BODYFAT, 1 / data$DENSITY, cex = 0.5)

summary(data)

person1 = which.min(data$BODYFAT)
person2 = which.min(data$DENSITY)
person3 = which.min(data$HEIGHT)
# data[person1,'HEIGHT'] = sqrt(data[person1,'WEIGHT']/data[person1,'ADIPOSITY']*703)
# data[person2,'HEIGHT'] = sqrt(data[person2,'WEIGHT']/data[person2,'ADIPOSITY']*703) 
# data[person3,'HEIGHT'] = sqrt(data[person3,'WEIGHT']/data[person3,'ADIPOSITY']*703)
# Person1:182 Person2:216 Person3:42
# According to the bodyfat and density, drop 182, 96, 48, 76, 216, 53
# Summary: totally drop 182, 96, 48, 76, 216, 53, 42

model = lm(BODYFAT ~ ., data = data[, c(-1, -3)])

par(mfrow=c(2,2))
# leverage 
p=14;n=251;
lm.hats = hatvalues(model)
plot(lm.hats, type = "h", ylab = "Leverage") 
text(lm.hats, labels = 1:n) 
abline(h=2*p/n, lty = 2)

# DFFITS
lm.dffits = dffits(model)
plot(lm.dffits, type = "h", ylab = "DFFITS", ylim = c(-4,6)) 
text(lm.dffits, labels = 1:n, cex = 0.8, pos = 1)
abline(h = c(-2*sqrt(p/n), 0, 2*sqrt(p/n)), col="red",lty = 2)

# cook's distance
lm.cooksD = cooks.distance(model)
plot(lm.cooksD, type = "h", ylab="Cook's Distance",ylim=c(0,2)) 
text(lm.cooksD, labels = 1:n)
abline(h=4/(n-p),col="red",lty=2)

# DFBETAS
lm.dfbetas = dfbetas(model)
plot(lm.dfbetas[,1], type = "h", ylab = "DFBETAS", xlab = "Index") 
text(lm.dfbetas[,1], labels = 1:n, cex = 0.8)
abline(h=c(-2/sqrt(n), 0, 2/sqrt(n)), lty = 2,col="red")

# Additionally drop 39
data = data[c(-182, -96, -48, -76, -216, -53, -42, -39), ]
write.csv(data,"../data/data_cleaned.csv")
