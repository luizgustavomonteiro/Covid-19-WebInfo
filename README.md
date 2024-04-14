# ** COVID-19 Info Web App**

Esta é uma aplicação web que permite aos usuários obter informações sobre casos confirmados e mortes relacionados à COVID-19 em diferentes países. Os dados são obtidos por meio da API-Covid-19 disponível no servidor da Kidopi.

##  **Funcionalidades**
- Escolha entre três países: Brasil, Canadá ou Austrália para visualizar os dados de casos confirmados e mortes.
- Armazenamento automático da data e hora de cada acesso à API-Covid-19, juntamente com o país selecionado para consulta.
- Exibição da data e país do último acesso à API-Covid-19 no rodapé da página.
- (Bônus) Comparação da taxa de mortalidade entre dois países diferentes. (Ainda em desenvolvimento)


### **Tecnologias Utilizadas**
- HTML, CSS e JavaScript para a criação da interface web.
- PHP para o backend, incluindo a comunicação com o banco de dados MySQL.
- Banco de dados MySQL para armazenar os registros de acesso à API-Covid-19.


### **Como Usar**
- Faça o clone deste repositório para o seu ambiente local.
- Configure um servidor PHP e um servidor MySQL em sua máquina (para desenvolvimento o XAMPP provou ser completo).
- Importe o arquivo datacovid.sql para criar a estrutura do banco de dados através do XAMPP (http://localhost/phpmyadmin/).
- Abra o arquivo index.html em seu navegador para iniciar a aplicação.
