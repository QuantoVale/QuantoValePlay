class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all
       render json:@contratos
  end

  def show
      @value_true = Float(Contrato.find(params["id"]).valorInicial)
      @value_false_1 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @value_false_2 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @value_false_3 = Float(Contrato.find(params["id"]).valorInicial)*rand(30)/(rand(30))
      @contratos = Contrato.find(params["id"])
      array_objeto = [@contratos.objeto.capitalize]

      @array_question = {"name"=>array_objeto, "val1"=>@value_true.round(0), "val2"=>@value_false_1.round(0), "val3"=>@value_false_2.round(0), "val4"=>@value_false_3.round(0),"true" =>@value_true.round(0)}
      #@array_question.flatten!
      render json: @array_question
  end

  def edit

  end

  def create
  end

end
