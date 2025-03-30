import { PrismaClient, QuestionType, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin1234',
      role: Role.Admin,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'John_Ay',
      email: 'john@gmail.com',
      password: 'john1234',
      role: Role.Admin,
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: 'Math',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Science',
    },
  });

  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'Basic Math Quiz',
      categoryId: category1.id,
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'Science Quiz',
      categoryId: category2.id,
    },
  });

  const question1 = await prisma.question.create({
    data: {
      text: 'What is 2 + 2?',
      type: QuestionType.MULTIPLE,
      quizId: quiz1.id,
      options: JSON.stringify(['1', '2', '3', '4']),
      corrAnswer: JSON.stringify(['4']),
    },
  });

  const question2 = await prisma.question.create({
    data: {
      text: 'What is the boiling point of water?',
      type: QuestionType.MULTIPLE,
      quizId: quiz2.id,
      options: JSON.stringify(['90°C', '100°C', '110°C', '120°C']),
      corrAnswer: JSON.stringify(['100°C']),
    },
  });

  const score1 = await prisma.score.create({
    data: {
      userId: admin.id,
      quizId: quiz1.id,
      points: 10,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
