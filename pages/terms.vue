<template>
  <div class="info-page">
    <header :class="{ onscroll: scrolled }">
      <div class="logo">
        <nuxt-link to="/">
          <img src="/img/logo-b.svg" alt="" />
        </nuxt-link>
      </div>
    </header>

    <div class="policy">
      <div>
        <h2><strong>Terms and Conditions</strong></h2>
        <p>Effective Date: [Date]</p>
        <p>1. Acceptance of Terms</p>
        <p>
          By using [Your Website Name], you agree to comply with and be bound by
          these Terms and Conditions. If you do not agree, please refrain from
          using our website.
        </p>
        <p>2. Use of Website</p>
        <p>
          You agree to use the website for lawful purposes and in a manner
          consistent with all applicable laws and regulations.
        </p>
        <p>3. Intellectual Property</p>
        <p>
          All content on this website, unless otherwise stated, is the
          intellectual property of [Your Company Name]. Unauthorized use is
          prohibited.
        </p>
        <p>4. User Accounts</p>
        <p>
          If you create an account on our website, you are responsible for
          maintaining the confidentiality of your account information.
        </p>
        <p>5. Privacy Policy</p>
        <p>
          Our Privacy Policy outlines how we collect, use, and protect your
          personal information. By using our website, you consent to our Privacy
          Policy.
        </p>
        <p>6. Links to Third-Party Websites</p>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the content or privacy practices of these sites.
        </p>
        <p>7. Disclaimers</p>
        <p>
          We provide our website on an &quot;as is&quot; and &quot;as
          available&quot; basis. We do not guarantee the accuracy, completeness,
          or reliability of any information on the website.
        </p>
        <p>8. Limitation of Liability</p>
        <p>
          To the extent permitted by law, [Your Company Name] is not liable for
          any direct, indirect, or consequential damages arising from the use of
          our website.
        </p>
        <p>9. Governing Law</p>
        <p>
          These Terms and Conditions are governed by the laws of the state of
          [Your State], without regard to its conflict of law principles.
        </p>
        <p>10. Changes to Terms</p>
        <p>
          We reserve the right to update these Terms and Conditions. Please
          check the effective date for the latest version.
        </p>
        <p>11. Contact Information</p>
        <p>
          If you have questions or concerns about these Terms and Conditions,
          contact us at [Your Contact Information].
        </p>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      isShow: false,
      arrowPos: 0,
      limitPosition: 100,
      scrolled: true,
      lastPosition: 0,
    };
  },
  mounted: function () {
    //this.startRotation();
    //this.isShow = true;
    setTimeout(() => {
      this.isShow = true;
    }, 100);
  },
  methods: {},

  computed: {},
  beforeRouteLeave(to, from, next) {
    //this.$modal.hide();
    next();
  },
};
</script>
  
<style lang="scss">
.info-page {
  padding: 3rem 4rem;

  header {
    position: relative;
    width: 100%;
    max-width: 980px;
    margin: 0 auto;
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 220px;
  }
}
.policy {
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  color: #111;
  padding-bottom: 2rem;

  p {
    text-align: justify;
  }

  h2 {
    text-transform: uppercase;
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
  