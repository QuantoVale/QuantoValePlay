class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all

  end

  def show
      @value_true = Float(Contrato.find(params["id"]).valorInicial)
      @value_false_1 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @value_false_2 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @value_false_3 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @contratos = Contrato.find(params["id"])

      array_value = [@value_true,@value_false_1,@value_false_2,@value_false_3]
      array_objeto = [@contratos.objeto.capitalize]
      array_question = [array_objeto, array_value.shuffle, @value_true]
      array_question.flatten!
      render json:array_question
  end

  def edit

  end

  def create
  end

end
