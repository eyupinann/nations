const NestFactory = require('@nestjs/core');
const SwaggerModule = require('@nestjs/swagger');
const DocumentBuilder = require('@nestjs/swagger');
const AppModule = require('./app.module');
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Nation API')
    .setDescription('The Nation API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
