# Notas

## Modelo de dados para cursos

```ts
model Course {
  id        Int      @id @default(autoincrement())
  title     String
  description String
  coverUrl   String
  duration   Int      // Duração em minutos, por exemplo
  // ... outros campos relevantes para o curso

  // Relação com os módulos do curso
  modules   Module[]
}

model Module {
  id        Int     @id @default(autoincrement())
  title     String
  courseId  Int     // Referência para o curso a que pertence
  course    Course  @relation(fields: [courseId], references: [id])

  // Relação com as aulas do módulo
  lessons   Lesson[]
}

model Lesson {
  id         Int     @id @default(autoincrement())
  title      String
  content    String  // Conteúdo da aula, pode ser um texto, URL, etc.
  moduleId   Int     // Referência para o módulo a que pertence
  module     Module  @relation(fields: [moduleId], references: [id])
}


```

Neste exemplo, temos três modelos: Course, Module e Lesson. Um Course possui vários módulos (Module) e cada Module possui várias aulas (Lesson). Adicione ou ajuste os campos conforme necessário para se adequarem aos detalhes do seu projeto.
