import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 727
    const app = await NestFactory.create(AppModule)

    const cfg = new DocumentBuilder()
        .setTitle("NestJS Backend App")
        .setDescription("documentation")
        .setVersion("1.0.0")
        .addTag("dehwyy")
        .build()
    const document = SwaggerModule.createDocument(app, cfg)
    SwaggerModule.setup("/api/docs", app, document)

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()