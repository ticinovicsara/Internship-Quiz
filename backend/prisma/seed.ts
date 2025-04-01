import { PrismaClient, QuestionType, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: await hashPassword('admin1234'),
      role: Role.Admin,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'JohnAy',
      email: 'john@gmail.com',
      password: await hashPassword('john1234'),
      role: Role.Player,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'JaneDoe',
      email: 'jane@gmail.com',
      password: await hashPassword('jane1234'),
      role: Role.Player,
    },
  });

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Math' },
      { name: 'Science' },
      { name: 'History' },
      { name: 'Geography' },
      { name: 'Technology' },
    ],
  });

  const categoriesData = await prisma.category.findMany();

  const quizzes = await prisma.quiz.createMany({
    data: [
      { title: 'Basic Math Quiz', categoryId: categoriesData[0].id },
      { title: 'Science Facts', categoryId: categoriesData[1].id },
      { title: 'World History', categoryId: categoriesData[2].id },
      { title: 'Geography Trivia', categoryId: categoriesData[3].id },
      { title: 'Tech Innovations', categoryId: categoriesData[4].id },
    ],
  });

  const quizzesData = await prisma.quiz.findMany();

  const questions = [
    {
      text: 'What is 5 + 3?',
      type: QuestionType.MULTIPLE,
      quizId: quizzesData[0].id,
      options: ['6', '7', '8', '9'],
      corrAnswer: ['8'],
    },
    {
      text: 'Solve for x: 2x = 10',
      type: QuestionType.FILL_IN_THE_BLANK,
      quizId: quizzesData[0].id,
      options: [],
      corrAnswer: ['5'],
    },
    {
      text: 'Match the shapes to their names: Circle, Square',
      type: QuestionType.MATCHING,
      quizId: quizzesData[0].id,
      options: ['Round Shape', 'Four-sided Shape'],
      corrAnswer: ['Circle-Round Shape', 'Square-Four-sided Shape'],
    },
    {
      text: 'Set the value of pi to the closest integer.',
      type: QuestionType.SLIDER,
      quizId: quizzesData[0].id,
      options: [],
      corrAnswer: ['3'],
    },
    {
      text: 'Sort these numbers in ascending order: 3, 1, 4, 2',
      type: QuestionType.SORT,
      quizId: quizzesData[0].id,
      options: ['3', '1', '4', '2'],
      corrAnswer: ['1', '2', '3', '4'],
    },
    {
      text: 'What is the chemical symbol for water?',
      type: QuestionType.MULTIPLE,
      quizId: quizzesData[1].id,
      options: ['H2O', 'O2', 'CO2', 'NaCl'],
      corrAnswer: ['H2O'],
    },
    {
      text: 'Name the planet closest to the sun.',
      type: QuestionType.FILL_IN_THE_BLANK,
      quizId: quizzesData[1].id,
      options: [],
      corrAnswer: ['Mercury'],
    },
    {
      text: 'Match the scientist to their discovery: Newton, Einstein',
      type: QuestionType.MATCHING,
      quizId: quizzesData[1].id,
      options: ['Gravity', 'Relativity'],
      corrAnswer: ['Newton-Gravity', 'Einstein-Relativity'],
    },
    {
      text: 'What is the normal body temperature in Celsius?',
      type: QuestionType.SLIDER,
      quizId: quizzesData[1].id,
      options: [],
      corrAnswer: ['37'],
    },
    {
      text: 'Sort these scientific fields by age: Physics, Biology, Chemistry',
      type: QuestionType.SORT,
      quizId: quizzesData[1].id,
      options: ['Physics', 'Biology', 'Chemistry'],
      corrAnswer: ['Physics', 'Biology', 'Chemistry'],
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        text: q.text,
        type: q.type,
        quizId: q.quizId,
        options: JSON.stringify(q.options),
        corrAnswer: JSON.stringify(q.corrAnswer),
      },
    });
  }

  await prisma.score.createMany({
    data: [
      { userId: admin.id, quizId: quizzesData[0].id, points: 10 },
      { userId: user1.id, quizId: quizzesData[1].id, points: 8 },
      { userId: user2.id, quizId: quizzesData[2].id, points: 7 },
      { userId: admin.id, quizId: quizzesData[3].id, points: 9 },
      { userId: user1.id, quizId: quizzesData[4].id, points: 6 },
    ],
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
