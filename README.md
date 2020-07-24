# QnA
Question and Answer API
Created by Ethan Parent

# Background
This is legacy codebase for the Q&A component of an eCommerce website. I created my own server within `/serverSDC` and optimized that server to allow 10,000 requests per second.

# Routes

#### GET 4 questions:
`<ec2Link>:4003/qa/:product_id`

# Generate 10M Records for each table:
From root in the terminal:
`bash serverSDC/QuestionSeed.sh 10000000`
`bash serverSDC/AnswerSeed.sh 10000000`
`bash serverSDC/PhotoSeed.sh 10000000`

# Optimiziation Photos:

![Image of New Relic testing](https://drive.google.com/file/d/1MP3fg7NNQiPKywiGc1TN9FP0519LzRSZ/view?usp=sharing)



