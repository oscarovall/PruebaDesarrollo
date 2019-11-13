package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class ParametroTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Parametro.class);
        Parametro parametro1 = new Parametro();
        parametro1.setId(1L);
        Parametro parametro2 = new Parametro();
        parametro2.setId(parametro1.getId());
        assertThat(parametro1).isEqualTo(parametro2);
        parametro2.setId(2L);
        assertThat(parametro1).isNotEqualTo(parametro2);
        parametro1.setId(null);
        assertThat(parametro1).isNotEqualTo(parametro2);
    }
}
