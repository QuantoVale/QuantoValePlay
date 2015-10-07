require 'spec_helper'

RSpec.describe ContratosController, type: :controller do
  describe "GET #Index" do
    it "should show all contracts" do
      contracts = Contrato.all
      get :index
      expect(assigns(:contratos)).to eq(contracts)
    end
  end

    describe "GET #Show" do
      it "should show a @contract" do
          contract = Contrato.new
          contract.identificadorContrato = "1"
          contract.uasg = "1"
          contract.modalidadeLicitacao = "1"
          contract.codigoContrato = "1"
          contract.licitacaoAssociada = "1"
          contract.objeto = "1"
          contract.numeroAditivos = 1
          contract.numeroProcessos = 1
          contract.CPFContratada = "1"
          contract.dataAssinatura = "1"
          contract.fundamentoGeral = "1"
          contract.dataInicioVigencia = "1"
          contract.dataTerminoVigencia = "1"
          contract.valorInicial = "1"
          contract.aditivosContratos = "1"
          contract.eventosContratos = "1"

          contract.save

          get :show, id: contract.id
          
          #teste valores falsos != valor inicial
          expect(assigns(:value_false_1)).not_to eq(contract.valorInicial)
          expect(assigns(:value_false_2)).not_to eq(contract.valorInicial)
          expect(assigns(:value_false_3)).not_to eq(contract.valorInicial)

          #teste valores falsos != entre si
          expect(assigns(:value_false_1)).not_to eq(:value_false_2)
          expect(assigns(:value_false_1)).not_to eq(:value_false_3)
          expect(assigns(:value_false_2)).not_to eq(:value_false_3)

        end
    end


end
