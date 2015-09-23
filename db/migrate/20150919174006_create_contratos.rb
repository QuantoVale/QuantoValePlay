class CreateContratos < ActiveRecord::Migration
  def change
    create_table :contratos do |t|
      t.string :identificadorContrato
      t.string :uasg
      t.string :modalidadeLicitacao
      t.string :codigoContrato
      t.string :licitacaoAssociada
      t.string :objeto
      t.integer :numeroAditivos
      t.integer :numeroProcessos
      t.string :CPFContratada
      t.string :dataAssinatura
      t.string :fundamentoGeral
      t.string :dataInicioVigencia
      t.string :dataTerminoVigencia
      t.string :valorInicial
      t.string :aditivosContratos
      t.string :eventosContratos
      t.timestamps
    end
  end
end
