require 'spec_helper'

RSpec.describe ContratosController, type: :controller do
    #teste todo
    describe "GET #Index" do
      #condição
      it "should show all contracts" do
          contracts = Contrato.all
          #pega os valores
          get :index
          #compara dois objetos
          expect(assigns(:contratos)).to eq(contracts)
      end

      #condição
      it "should render json" do
          #pega os valores
          contracts = (Contrato.all).to_json
          get :index
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

        end
    end
end
