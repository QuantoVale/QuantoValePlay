class ContratosController < ApplicationController

  def index
       @contratos = Contrato.all
       render json:@contratos
  end

  def values_aleatory ()
    return @value_true*(1+rand(30))/(1+(rand(30)))
  end

  def applying_flatten()
    @array_value = [@values_random, @value_true.round(0)]
    return @array_value.flatten!
  end

  def show
      @values_random = Array.new(3)
      @value_true = Float(Contrato.find(params["id"]).valorInicial)
      for i in 0..2
          @values_random[i] = values_aleatory().round(0)
      end
      @array_question = [Contrato.find(params["id"]).objeto.capitalize, applying_flatten().shuffle, @value_true.round(0)]
      @array_question.flatten!
      render json:@array_question
    end

  def edit

  end

  def create
  end

end
