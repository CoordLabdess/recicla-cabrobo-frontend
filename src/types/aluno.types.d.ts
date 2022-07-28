/*export class AlunoEntity {
    export class AlunoEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  matricula: string;

  @Column()
  nome: string;

  @Column()
  sexo: string;

  @Column()
  idade: number;

  @ManyToOne((type) => EscolaEntity, (escola) => escola.alunos, { eager: true })
  escola: EscolaEntity;

  @Column({ nullable: true })
  serie: string;

  @OneToMany((type) => EntregaEntity, (entrega) => entrega.aluno, {
    cascade: true,
  })
  entregas: EntregaEntity[];

  @OneToMany(
    (type) => ResgatePremioEntity,
    (resgatePremios) => resgatePremios.aluno,
    { cascade: true },
  )
  resgatePremios: ResgatePremioEntity[];

  @Column()
  pontos: number;

  @OneToMany((type) => AtividadeEntity, (atividade) => atividade.aluno)
  atividades: AtividadeEntity[];

  @Column()
  senha: string;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
}*/
