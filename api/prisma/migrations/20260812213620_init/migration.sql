-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crea" TEXT NOT NULL,
    "plan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "numeroSerie" TEXT NOT NULL,
    "anoFabricacao" INTEGER NOT NULL,
    "pressaoProjeto" REAL NOT NULL,
    "pressaoOperacao" REAL NOT NULL,
    "pressaoTesteHidrostatico" REAL,
    "volume" REAL NOT NULL,
    "pmta" REAL NOT NULL,
    "temperaturaProjeto" REAL,
    "temperaturaOperacao" REAL,
    "diametroInterno" REAL,
    "alturaComprimento" REAL,
    "materialConstrucao" TEXT NOT NULL,
    "codigoProjeto" TEXT NOT NULL,
    "fluido" TEXT NOT NULL,
    "classeFluido" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "categoria" TEXT,
    "grupoPotencialRisco" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Equipamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Equipamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inspecao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "equipamentoId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataTermino" DATETIME NOT NULL,
    "examesExternos" BOOLEAN NOT NULL,
    "examesInternos" BOOLEAN NOT NULL,
    "testeHidrostatico" BOOLEAN NOT NULL,
    "temSPIE" BOOLEAN NOT NULL,
    "parecer" TEXT NOT NULL,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inspecao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inspecao_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ParametrosUltrassom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspecaoId" TEXT NOT NULL,
    "aparelho" TEXT NOT NULL,
    "transdutor" TEXT NOT NULL,
    "velocidadeSonica" REAL NOT NULL,
    "tecnica" TEXT NOT NULL,
    "blocoCalibracao" TEXT NOT NULL,
    CONSTRAINT "ParametrosUltrassom_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspecaoId" TEXT NOT NULL,
    "secao" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "ok" BOOLEAN,
    "observacao" TEXT NOT NULL,
    CONSTRAINT "ChecklistItem_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medicao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspecaoId" TEXT NOT NULL,
    "ponto" TEXT NOT NULL,
    "espessura" REAL NOT NULL,
    "espessuraAnterior" REAL,
    "espessuraConstrucao" REAL,
    "tempoOperacao" REAL,
    "dataMedicao" DATETIME NOT NULL,
    "observacao" TEXT NOT NULL,
    CONSTRAINT "Medicao_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Anomalia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspecaoId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "gravidade" TEXT NOT NULL,
    "foto" TEXT,
    "planoAcao" TEXT NOT NULL,
    "resolvida" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Anomalia_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DispositivoSeguranca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inspecaoId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "fabricante" TEXT,
    "modelo" TEXT,
    "numeroSerie" TEXT,
    "inspecaoOk" BOOLEAN NOT NULL,
    "pressaoAbertura" REAL,
    "pressaoVedacao" REAL,
    "conexaoEntrada" TEXT,
    "conexaoSaida" TEXT,
    "ultimaCalibracao" DATETIME,
    "proximaCalibracao" DATETIME,
    "numeroCertificado" TEXT,
    "observacao" TEXT NOT NULL,
    CONSTRAINT "DispositivoSeguranca_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Laudo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "inspecaoId" TEXT NOT NULL,
    "equipamentoId" TEXT NOT NULL,
    "numeroLaudo" TEXT NOT NULL,
    "dataEmissao" DATETIME NOT NULL,
    "plhNome" TEXT NOT NULL,
    "plhCrea" TEXT NOT NULL,
    "plhAssinatura" TEXT,
    "dataProximaInspecao" DATETIME NOT NULL,
    "observacoes" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Laudo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Laudo_inspecaoId_fkey" FOREIGN KEY ("inspecaoId") REFERENCES "Inspecao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Laudo_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ParametrosUltrassom_inspecaoId_key" ON "ParametrosUltrassom"("inspecaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Laudo_inspecaoId_key" ON "Laudo"("inspecaoId");
