begin transaction;
create type tendereco as object
(rua varchar2(30),
 numero number,
 complemento varchar2(50),
 bairro varchar2(20),
 cidade varchar2(20),
 cep number(8),
 uf varchar2(2)
 );
 /
create type tender as table of tendereco;
/
create type tpessoa as object
(nome varchar2(30),
 apelido varchar2(15),
 cpf number(11),
 rg number(7),
 sexo char,
 dataNasc date,
 endereco tender
) not final;
/
create type tpaciente under tpessoa
(foto blob,
 faz ref tconsulta,
 e_um ref tusuario
 );
 /
create type tmedico under tpessoa
(email varchar2(30),
 senha integer,
 crm varchar2(9),
 residenciaPrincipal varchar2(20),
 residencia tresiden,
 diploma tdiplom,
 certificado tcert,
 possui ref tagenda,
 faz_um ref tfeedback
 );
/
create type tresidencia as object
(nome varchar2(20),
 descricao varchar2(30),
 valorMedio number
);
/
create type tresiden as table of tresidencia;
/
create type tdiploma as object
(instituicao varchar2(20),
 dataFormatura date,
 curso varchar2(20)
);
/
create type tdiplom as table of tdiploma;
/
create type tcertificado as object
(nomeEvento varchar2(20),
 lugar varchar2(20),
 horas date,
 areaDeEspecialidade varchar2(30)
);
/
create type tcert as table of tcertificado;
/
create type tcartao as object
(numero number(12),
 validade date
);
/
create type tcart as table of tcartao;
/
create type tusuario as object
(email varchar2(30),
 senha integer,
 cartao tcart
);
/
create type tagenda as object
(data date,
 horaInicio date,
 horaFim date,
 disponivel bit,
 e_de ref tmedico,
 tem_uma ref tconsulta
);
/
create type tconsulta as object
(duracao date,
 maisDeUm bit,
 descricao varchar2(30),
 notaPaciente number,
 notaMedico number,
 preco number,
 e_de ref tagenda,
 tem_um ref tpaciente,
 pode_ser ref temergencia,
 origina ref tprescricao,
 dar_origem ref texame
 );
 /
create type temergencia as object
(preco number,
 tipo ref tconsulta
);
/
create type tprescricao as object
(dosagemMl number,
 intervalo date,
 dias number,
 e_de ref tconsulta,
 tem_um ref tmedicamento
);
/
create type tmedicamento as object
(nome varchar2(20),
 descricao varchar2(30),
 e_de_uma ref tprescricao
);
/
create type texame as object
(nome varchar2(20),
 descricao varchar2(50),
 resulta ref tfeedback,
 e_de ref tconsulta
);
/
create type tfeedback as object
(diagnostico varchar2(50),
 tem_um ref texame,
 e_de_um ref tmedico
);
/
create table PESSOA of tpessoa 
    nested table endereco store as tender;
/
create table EMERGENCIA of temergencia;
/
create table PRESCRICAO of tprescricao;
/
create table MEDICAMENTO of tmedicamento;
/
create table EXAME of texame;
/
create table FEEDBACK of tfeedback;
/
create table CONSULTA of tconsulta;
/
create table USUARIO of tusuario
	nested table cartao store as tcart;
/
create table PACIENTE of tpaciente
	nested table endereco store as tender;
/
create table MEDICO of tmedico 
	nested table residencia store as tresiden
	nested table diploma store as tdiplom
 	nested table certificado store as tcert
	nested table endereco store as tender;
/
create table AGENDA of tagenda;
/
commit;
/
