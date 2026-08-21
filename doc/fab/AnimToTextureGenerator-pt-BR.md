[lag]{Português (BR)}
[简体中文]{fab/AnimToTextureGenerator-zh.md}
[English]{fab/AnimToTextureGenerator-en.md}
[한국어]{fab/AnimToTextureGenerator-ko.md}
[Русский]{fab/AnimToTextureGenerator-ru.md}
[日本語]{fab/AnimToTextureGenerator-ja.md}
[Español]{fab/AnimToTextureGenerator-es.md}
[Português (BR)]{fab/AnimToTextureGenerator-pt-BR.md}
[Français]{fab/AnimToTextureGenerator-fr.md}
[Deutsch]{fab/AnimToTextureGenerator-de.md}
[繁體中文]{fab/AnimToTextureGenerator-zh-Hant.md}

# AnimToTextureGenerator Documentação do Plugin

---

### Visão geral

**AnimToTextureGenerator** é um plugin para Unreal Engine 5 que converte automaticamente as sequências de animação de malhas esqueléticas em **Texturas de Animação de Vértices (Vertex Animation Texture, VAT)**, e gera todos os recursos relacionados, incluindo malhas estáticas, instâncias de material e ativos de dados. Ele simplifica o fluxo de trabalho de VAT integrando ferramentas do editor, permitindo uma conversão de animação para textura com um único clique.

Este plugin é compatível com **Unreal Engine 5.4 a 5.8**, compatível com as APIs do UE 5.4-5.6 e UE 5.7+.

### Recursos

- **Geração de VAT com um clique**: Converte as sequências de animação de malhas esqueléticas em texturas de animação de vértices com um único clique.
- **Criação automática de malhas estáticas**: Gera automaticamente malhas estáticas a partir de malhas esqueléticas para renderização VAT.
- **Gerenciamento de instâncias de material**: Clona e gerencia automaticamente as instâncias de material, preservando a hierarquia de materiais original.
- **Extração de texturas de ossos**: Extrai as texturas de rotação, posição e peso dos ossos para armazenar os dados de animação.
- **Seletor de sequências de animação**: Diálogo integrado para filtrar e selecionar sequências de animação, exibindo apenas as compatíveis com o esqueleto da malha esquelética selecionada.
- **Suporte a LOD**: Ao selecionar animações, é possível escolher o nível de detalhamento (LOD) a ser processado.
- **Validação de taxa de amostragem**: Verifica automaticamente a taxa de amostragem das sequências de animação e emite um aviso se não forem consistentes (o que pode causar travamentos na animação).
- **Integração com o Navegador de Conteúdo**: Ao selecionar uma malha esquelética no navegador de conteúdo, adiciona uma entrada no menu de contexto do botão direito.
- **Barra de ferramentas do Editor de Malha Esquelética**: Adiciona um botão de barra de ferramentas no editor de malha esquelética para acesso rápido conveniente.
- **Compatibilidade UE 5.4-5.8**: Através de compilação condicional, garante a compatibilidade entre UE 5.4 e 5.8, lidando com as alterações de API entre as versões.

### Requisitos do ambiente

- **Unreal Engine**: 5.4, 5.5, 5.6, 5.7 ou 5.8
- **IDE**: Visual Studio 2019 ou posterior (recomendado para projetos C++)
- **Tipo de projeto**: Apenas plugin de editor (não pode ser empacotado no tempo de execução)

### Etapas de instalação

1. Clone ou copie a pasta do plugin no diretório `Plugins/` do seu projeto.
2. Se o seu projeto não tiver uma pasta `Plugins`, crie-a na raiz do projeto.
3. Clique com o botão direito no arquivo `.uproject`, selecione **Gerar arquivos do projeto (Generate Project Files)** (ou execute `Setup.sh` / `GenerateProjectFiles.sh`).
4. Abra o projeto no editor do Unreal Engine.
5. Vá em **Editar > Plugins (Edit > Plugins)**, procure por **AnimToTextureGenerator** e ative-o.
6. Se for solicitado reiniciar o editor, reinicie.

### Como usar

#### Método um: Menu de contexto do Navegador de Conteúdo

1. No **Navegador de Conteúdo (Content Browser)**, selecione um recurso de **Malha Esquelética (Skeletal Mesh)**.
2. Clique com o botão direito no recurso selecionado para abrir o menu de contexto.
3. Clique em **Convert Animations to Texture (VAT)**.
4. Uma caixa de diálogo para seleção de diretório será aberta — escolha o caminho de salvamento e clique em **Select Folder**.
5. A caixa de diálogo do **Seletor de Sequências de Animação** será aberta, exibindo apenas as animações compatíveis com o esqueleto da malha esquelética selecionada.
6. Selecione **múltiplas** sequências de animação para converter.
7. Use o menu suspenso **LOD** para escolher o nível de detalhamento a ser processado.
8. Clique em **Confirm Selection (Confirmar seleção)**.
9. Se as taxas de amostragem das animações selecionadas não forem consistentes, uma caixa de diálogo de aviso aparecerá — clique em **Sim** para continuar ou **Não** para cancelar.
10. O plugin executará o processo de conversão e, ao concluir, exibirá uma notificação de sucesso.

#### Método dois: Barra de ferramentas do Editor de Malha Esquelética

1. Abra o **Editor de Malha Esquelética (Skeletal Mesh Editor)** com uma malha esquelética.
2. Clique no botão **AnimToTextureGenerator** na barra de ferramentas do editor (ícone: ícone de classe Texture2D).
3. Siga os passos 4-10 do Método um.

#### Método três: Botão do plugin (malha esquelética ativa)

1. Certifique-se de que há uma malha esquelética aberta no **Editor de Malha Esquelética** (recurso ativo).
2. Use o botão do plugin (acessível pela barra de ferramentas ou por um atalho personalizado).
3. Siga os passos 4-10 do Método um.

#### Demonstração completa em vídeo

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="https://www.youtube.com/embed/FDQjzFrp8bA?autoplay=1&start=30&controls=0"
        scrolling="no"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="640"
        height="480">
</iframe>
</div>

### Recursos gerados

Após concluir a conversão, os seguintes recursos serão criados no caminho de salvamento selecionado:

| Tipo de recurso                                         | Descrição                                                                                                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Malha estática (Static Mesh)**                        | Malha estática derivada da malha esquelética, utilizada para renderização VAT.                                                                             |
| **Material raiz (Material)**                            | Material raiz que contém nós de shader VAT para amostragem de textura de animação.                                                                         |
| **Instância de material (Material Instance)**           | Instâncias de material para cada canal de material, vinculadas ao material raiz.                                                                           |
| **Ativo de dados (Data Asset)**                         | `UAnimToTextureDataAsset` — contém referências a todos os recursos gerados, sequências de animação, texturas de ossos e informações de taxa de amostragem. |
| **Textura de rotação de ossos (Bone Rotation Texture)** | Textura que armazena os dados de animação de rotação de ossos.                                                                                             |
| **Textura de posição de ossos (Bone Position Texture)** | Textura que armazena os dados de animação de posição de ossos.                                                                                             |
| **Textura de peso de ossos (Bone Weight Texture)**      | Textura que armazena os dados de animação de peso de ossos.                                                                                                |

### API do Blueprint

O plugin fornece as seguintes funções chamáveis pelo Blueprint através de `AnimToTextureGeneratorLibrary`:

| Função                                      | Descrição                                                                                                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | Abre a caixa de diálogo do seletor de sequências de animação filtradas. Parâmetros: `FilterSkeletalMesh` (malha esquelética para filtragem), `OnAssetsPicked` (delegado de retorno de chamada). |
| `ShowSimpleSuccessToast`                    | Exibe uma notificação de sucesso simples. Parâmetros: `Message` (texto a exibir), `Duration` (duração de exibição em segundos).                                                                 |
| `InvokeConvertSkeletalMeshToStaticMesh`     | Converte uma malha esquelética em uma malha estática. Parâmetros: `SkeletalMesh`, `NamePrefix`, `LODIndex`. Valor de retorno: `UStaticMesh*`.                                                   |
| `InvokeAnimationToTexture`                  | Inicia a conversão principal de animação para textura. Parâmetros: `DataAsset`. Valor de retorno: `bool`.                                                                                       |
| `InvokeSetLightMapIndex`                    | Define o índice de UV de mapa de luz da malha estática. Parâmetros: `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. Valor de retorno: `bool`.                                |
| `InvokeUpdateMaterialInstanceFromDataAsset` | Atualiza a instância de material com base no ativo de dados. Parâmetros: `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.                                                       |
| `FindActiveSkeletalMesh`                    | Encontra a malha esquelética ativa atual no editor. Valor de retorno: `USkeletalMesh*`.                                                                                                         |

### Ativo de dados: UAnimToTextureDataAsset

O `UAnimToTextureDataAsset` é a estrutura de dados central que armazena todas as informações necessárias para gerar a VAT:

| Propriedade           | Tipo                     | Descrição                                                               |
| --------------------- | ------------------------ | ----------------------------------------------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | Matriz de sequências de animação incluídas na VAT.                      |
| `SkeletalMesh`        | `USkeletalMesh*`         | Referência à malha esquelética de origem.                               |
| `StaticMesh`          | `UStaticMesh*`           | Referência à malha estática gerada.                                     |
| `BoneRotationTexture` | `UTexture2D*`            | Textura de animação de rotação de ossos.                                |
| `BonePositionTexture` | `UTexture2D*`            | Textura de animação de posição de ossos.                                |
| `BoneWeightTexture`   | `UTexture2D*`            | Textura de animação de peso de ossos.                                   |
| `SampleRate`          | `float`                  | Taxa de amostragem de quadros (quadros por segundo em formato decimal). |
| `UVChannel`           | `int`                    | Índice do canal UV utilizado pela malha estática.                       |

### Estrutura de módulos

| Arquivo                             | Descrição                                                                                                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AnimToTextureGenerator.cpp`        | Ponto de entrada principal do módulo. Gerencia o início/encerramento, registro de botões da barra de ferramentas, menu de contexto do navegador de conteúdo e extensão da barra de ferramentas do editor de malha esquelética. |
| `AnimToTextureGeneratorLibrary.cpp` | Funções de biblioteca acessíveis pelo Blueprint. Fornece funções utilitárias para abrir o seletor de animações, invocar a conversão, gerenciar materiais e exibir notificações.                                                |
| `Processor.cpp`                     | Lógica de processamento principal. Coordena o fluxo completo de geração de VAT: criação de malhas estáticas, extração de texturas de ossos, clonagem de materiais, criação de instâncias de material e geração de VAT.         |
| `AnimSequencePicker.cpp`            | Controle de interface de usuário Slate para a caixa de diálogo do seletor de sequências de animação. Fornece seleção de recursos filtrados com suporte a níveis de detalhamento (LOD).                                         |

### Compatibilidade de versões

O plugin utiliza compilação condicional para suportar múltiplas versões do UE:

- **UE 5.4 - 5.6**: Utiliza `UAnimToTextureGeneratorLibrary` para chamadas de função internas, e `LayerParameter` como associação de parâmetro de material.
- **UE 5.7+**: Utiliza `UAnimToTextureBPLibrary` para chamadas de função internas, e `GlobalParameter` como associação de parâmetro de material.

### Licença

Direitos autorais (c) qq292. Todos os direitos reservados.

---

|                                                                                       |                                                                                                              |                                                                                                       |                                                                                                                                                            |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Github](https://cdn.simpleicons.org/github/24292e =x30)](https://github.com/qq292) | [![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x30)](https://space.bilibili.com/3707016472169438) | [![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x30) ](https://www.youtube.com/@gaojiangchen) | [![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x30)](https://www.fab.com/sellers/gaojiang%20chen/about) |
