class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all

  end

  def show
      @valorFalso1 = Float(Contrato.find(params["id"]).valorInicial)* 10
      @valorFalso2 = Float(Contrato.find(params["id"]).valorInicial)* 15
      @valorFalso3 = Float(Contrato.find(params["id"]).valorInicial)* 20

      puts "*" * 100, params["id"], "*" * 100
      @contratos = Contrato.find(params["id"])
      puts @contratos.id

      #render json:@contratos
      #render json:@valorFalso1
      array = [@contratos.objeto,@valorFalso1,@valorFalso2,@valorFalso3]
      render json:array

  end

  def edit

  end

  def create
  end

end
