require 'spec_helper'

RSpec.describe ContratosController, type: :controller do
    #teste todo
    describe "GET #Index" do
      #condição
      it "should show all contracts" do
          contracts = (Contrato.all).to_json
          #pega os valores
          get :listAllContracts
          #compara dois objetos
          expect(assigns(:listAllContracts)).to eq(contracts)
      end
      #condição
      it "should render json" do
          #pega os valores
          contracts = (Contrato.all).to_json
          get :listAllContracts
          expect(response.body).to eq(contracts)
      end

    end
    # indentifica um método o rash #
    describe "POST #values_aleatory" do
        it "original value should be different from aleatory value" do
            value_true = 10
            value_aleatory = value_true*(1+rand(30))/(1+(rand(30)))
            expect(value_true).not_to eq(value_aleatory)
        end

        it "it expected a value not exceeding the minimum value and maximum value parameters" do
            value_true = 10
            value_aleatory = value_true*(1+rand(30))/(1+(rand(30)))
            expect(value_aleatory).to be_between(value_true/31, value_true*31)
        end
    end

        describe "expected to join 4 strings into a single variable" do
            it "should string" do
                #fazer dps
            end
        end

        describe "test values ​​read by api" do
                it "test values ​​read by api" do
                    u = Contrato.new(
                        :identificadorContrato =>'Identificador',
                        :uasg => 'uasg',
                        :modalidadeLicitacao => 'modalidade_licitacao',
                        :codigoContrato => 'codigo_contrato',
                        :licitacaoAssociada => 'licitacao_associada',
                        :objeto => 'objeto',
                        :numeroAditivos => 1,
                        :numeroProcessos => 1,
                        :CPFContratada => 'cnpj_contratada',
                        :dataAssinatura => 'data_assinatura',
                        :fundamentoGeral => 'fundamento_geral',
                        :dataInicioVigencia => 'data_inicio_vigencia',
                        :dataTerminoVigencia => 'data_termino_vigencia',
                        :valorInicial => "100.0"
                    )
                    #salva a informação no banco;
                    u.save
                    #acessa a o método show usando o id do contrado criado acima
                    get :show, id: u.id
                    expect(assigns(:contrato).identificadorContrato).to eq(u.identificadorContrato)
                    expect(assigns(:contrato).uasg).to eq(u.uasg)
                    expect(assigns(:contrato).modalidadeLicitacao).to eq(u.modalidadeLicitacao)
                    expect(assigns(:contrato).codigoContrato).to eq(u.codigoContrato)
                    expect(assigns(:contrato).licitacaoAssociada).to eq(u.licitacaoAssociada)
                    expect(assigns(:contrato).objeto).to eq(u.objeto)
                    expect(assigns(:contrato).objeto).to eq(u.objeto)
                    expect(assigns(:contrato).numeroAditivos).to eq(u.numeroAditivos)
                    expect(assigns(:contrato).numeroProcessos).to eq(u.numeroProcessos)
                    expect(assigns(:contrato).CPFContratada).to eq(u.CPFContratada)
                    expect(assigns(:contrato).modalidadeLicitacao).to eq(u.modalidadeLicitacao)
                    expect(assigns(:contrato).dataAssinatura).to eq(u.dataAssinatura)
                    expect(assigns(:contrato).fundamentoGeral).to eq(u.fundamentoGeral)
                    expect(assigns(:contrato).dataInicioVigencia).to eq(u.dataInicioVigencia)
                    expect(assigns(:contrato).dataTerminoVigencia).to eq(u.dataTerminoVigencia)
                    expect(assigns(:contrato).valorInicial).to eq(u.valorInicial)
                 end
             end
end
