class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all


  end

  def show
      puts "*" * 100, params["id"], "*" * 100
       @contratos = Contrato.find(params["id"])
       puts @contratos.id
      
  end

  def edit

  end

  def create
  end

end
