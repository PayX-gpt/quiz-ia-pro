-- Configuração do funil editável pelo painel (pesos do teste A/B).

CREATE TABLE IF NOT EXISTS public.funnel_config (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.funnel_config (key, value)
VALUES ('variant_weights', '{"A":100,"B":0,"C":0,"D":0}'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.funnel_config ENABLE ROW LEVEL SECURITY;

-- O funil precisa ler os pesos no navegador.
DROP POLICY IF EXISTS "leitura da config" ON public.funnel_config;
CREATE POLICY "leitura da config"
  ON public.funnel_config FOR SELECT TO anon, authenticated
  USING (true);

-- ATENÇÃO: escrita liberada para anon é o que permite salvar os pesos pelo
-- /live sem login. Enquanto o painel estiver público, qualquer pessoa com a
-- URL pode mudar a divisão do seu tráfego. Antes de rodar tráfego pago,
-- troque para `TO authenticated` e coloque login no painel.
DROP POLICY IF EXISTS "escrita da config" ON public.funnel_config;
CREATE POLICY "escrita da config"
  ON public.funnel_config FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);
