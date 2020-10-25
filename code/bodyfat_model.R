#YCL created this code script
#HJ reviewed, revised and documented this code script
#YCL is ultimately responsible for this code script

library(leaps)
library(MASS)
library(caret)
data_raw=read.csv("data_cleaned.csv")[,-c(1,2)] ##data is from datacleaning

### change variable names to lower case 
names(data_raw)=tolower(names(data_raw))
### change lb/inch values to kg/cm
data_raw$weight=data_raw$weight*0.45359237
data_raw$height=data_raw$height*2.54

### split training and testing dataset 
smp_size <- floor(0.75 * nrow(data_raw))
set.seed(333)
train_ind <- sample(seq_len(nrow(data_raw)), size = smp_size)
data_train <- data_raw[train_ind, ]
data_test <- data_raw[-train_ind, ]

# model 1

### select the three variables 
name_model1=(names(data_raw)[-1])[c(2,3,4)]
### create training formula 
name_set=t(combn(name_model1,2))
name_set_paste=paste(paste(name_set[,1],name_set[,2],sep=":"),collapse = "+")
name_set_paste2=paste(name_model1,collapse = "+")
fmla=as.formula(paste("bodyfat~",name_set_paste2,"+",name_set_paste,sep=""))

### train test
lm_election=lm(fmla,data=data_train)

X <- model.matrix(lm_election)[,-1]
election.leaps <- leaps(X, data_train$bodyfat, nbest=1, method='adjr2')

best.model.adjr2 <- election.leaps$which[which.max(election.leaps$adjr2),]
a=colnames(X)[best.model.adjr2]

plot(election.leaps$size, election.leaps$adjr2, pch=23, bg='orange', cex=2, 
     xlab="Number of Parameters", ylab="Adjusted R2 of the Best Model",
     main="Adjusted R^2 for Each Possible Model in Our Election Data")

fmla_model1=as.formula(paste("bodyfat~",paste(a,collapse = "+"),sep=""))

### test the trained model 
model1=lm(fmla_model1,data_train)
sqrt(sum(model1$residuals^2)/183) ## RMSE on training set
pre1=predict(model1,data_test[-1])
res1=(pre1-data_test[1])
sqrt(sum(res1^2)/61) ### RMSE on test data


### full model1
lm_election=lm(fmla,data=data_raw)


X <- model.matrix(lm_election)[,-1]
election.leaps <- leaps(X, data_raw$bodyfat, nbest=1, method='adjr2')

best.model.adjr2 <- election.leaps$which[which.max(election.leaps$adjr2),]
a=colnames(X)[best.model.adjr2]

plot(election.leaps$size, election.leaps$adjr2, pch=23, bg='orange', cex=2, 
     xlab="Number of Parameters", ylab="Adjusted R2 of the Best Model",
     main="Adjusted R^2 for Each Possible Model in Our Election Data")

fmla_model1=as.formula(paste("bodyfat~",paste(a,collapse = "+"),sep=""))

model1=lm(fmla_model1,data_raw)
sqrt(sum(model1$residuals^2)/244) ## RMSE on data set
model1_coefficients=data.frame(vairable=c(names(model1$coefficients)),coefficients=model1$coefficients)
row.names(model1_coefficients)=c()
write.csv(model1_coefficients,"../image/model1.csv")

# model2
### select more variables 
name_model2=(names(data_raw)[-1])[c(2,3,4,7,9,15)]
name_set=t(combn(name_model2,2))
name_set_paste=paste(paste(name_set[,1],name_set[,2],sep=":"),collapse = "+")
name_set_paste2=paste(name_model2,collapse = "+")
fmla=as.formula(paste("bodyfat~",name_set_paste2,"+",name_set_paste,sep=""))

### train test
lm_election=lm(fmla,data=data_train)



X <- model.matrix(lm_election)[,-1]
election.leaps <- leaps(X, data_train$bodyfat, nbest=1, method='adjr2')

best.model.adjr2 <- election.leaps$which[which.max(election.leaps$adjr2),]
a=colnames(X)[best.model.adjr2]

plot(election.leaps$size, election.leaps$adjr2, pch=23, bg='orange', cex=2, 
     xlab="Number of Parameters", ylab="Adjusted R2 of the Best Model",
     main="Adjusted R^2 for Each Possible Model in Our Election Data")

fmla_model2=as.formula(paste("bodyfat~",paste(a,collapse = "+"),sep=""))


model2=lm(fmla_model2,data_train)
sqrt(sum(model2$residuals^2)/183) ## RMSE on training set
pre2=predict(model2,data_test[-1])
res2=(pre2-data_test[1])
sqrt(sum(res2^2)/61) ### RMSE on test data

### full model2
lm_election=lm(fmla,data=data_raw)

X <- model.matrix(lm_election)[,-1]
election.leaps <- leaps(X, data_raw$bodyfat, nbest=1, method='adjr2')

best.model.adjr2 <- election.leaps$which[which.max(election.leaps$adjr2),]
a=colnames(X)[best.model.adjr2]

plot(election.leaps$size, election.leaps$adjr2, pch=23, bg='orange', cex=2, 
     xlab="Number of Parameters", ylab="Adjusted R2 of the Best Model",
     main="Adjusted R^2 for Each Possible Model in Our Election Data")

fmla_model2=as.formula(paste("bodyfat~",paste(a,collapse = "+"),sep=""))

model2=lm(fmla_model2,data_raw)
sqrt(sum(model2$residuals^2)/244) ## RMSE on data set
model2_coefficients=data.frame(vairable=c(names(model2$coefficients)),coefficients=model2$coefficients)
row.names(model2_coefficients)=c()
write.csv(model2_coefficients,"../image/model2.csv")

## model3
### select all variables 
name_model3=(names(data_raw)[-1])[2:15]
name_set=t(combn(name_model3,2))
name_set_paste=paste(paste(name_set[,1],name_set[,2],sep=":"),collapse = "+")
name_set_paste2=paste(name_model3,collapse = "+")
fmla=as.formula(paste("bodyfat~",name_set_paste2,"+",name_set_paste,sep=""))

### train and test
train.control <- trainControl(method = "cv", number = 10)
# Train the model
step.model <- train(fmla, data = data_train,
                    method = "leapBackward", 
                    tuneGrid = data.frame(nvmax = 1:106),
                    trControl = train.control
)

names(coef(step.model$finalModel, step.model$bestTune[[1]]))
model3=lm(bodyfat~height:forearm+forearm:wrist+abdomen:height+abdomen+age:ankle+age:wrist+ankle:wrist,data_train)
sqrt(sum(model3$residuals^2)/183) ## RMSE on training set
pre3=predict(model3,data_test[-1])
res3=(pre3-data_test[1])
sqrt(sum(res3^2)/61) ### RMSE on test data

### full model
step.model <- train(fmla, data = data_raw,
                    method = "leapBackward", 
                    tuneGrid = data.frame(nvmax = 1:106),
                    trControl = train.control
)
step.model$bestTune ## the best nvmax
names(coef(step.model$finalModel,step.model$bestTune[[1]]))
model3=lm(bodyfat~height:hip+hip+abdomen:neck+neck:hip+height:forearm+forearm:wrist,data_raw)
sqrt(sum(model3$residuals^2)/244) ## RMSE on data set
model3_coefficients=data.frame(vairable=c(names(model3$coefficients)),coefficients=model3$coefficients)
row.names(model3_coefficients)=c()
write.csv(model3_coefficients,"../image/model3.csv")

### diagnostics
qqnorm(model1$residuals, main="Q-Q Plot for Model1")
qqnorm(model2$residuals,main="Q-Q Plot for Model2")
qqnorm(model3$residuals,main="Q-Q Plot for Model3")
plot(model1$residuals,main="Model1")
plot(model2$residuals,main="Model2")
plot(model3$residuals,main="Model3")
plot(model1$fitted.values,model1$residuals,main="Residuals vs Fitted Model1")
plot(model2$fitted.values,model2$residuals,main="Residuals vs Fitted Model2")
plot(model3$fitted.values,model3$residuals,main="Residuals vs Fitted Model3")

