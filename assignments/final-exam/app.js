const express = require('express');
const { userRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/users', userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is now up listening on port ${port}`);
});
