class CreateContratos < ActiveRecord::Migration
  def change
    create_table :contratos do |t|
      t.long :identificadorContrato
      t.string :uasg
      t.string :modalidadeLicitacao
      t.string :codigoContrato
      t.string :licitacaoAssociada
      t.string :objeto
      t.int :numeroAditivos
      t.long :numeroProcessos
      t.string :CPFContratada
      t.string :dataAssinatura
      t.string :fundamentoGeral
      t.string :dataInicioVigencia
      t.string :dataTerminoVigencia
      t.String :valorInicial
      t.string :aditivosContratos
      t.string :eventosContratos
      t.timestamps
    end
  end
end
