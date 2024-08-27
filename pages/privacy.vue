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
        <h2><strong>Privacy Policy</strong></h2>
        <p>Effective Date: [Date]</p>
        <p>1. Introduction</p>
        <p>
          Thank you for choosing [Your Website Name]. This Privacy Policy
          describes how we collect, use, and protect the personal information
          you provide.
        </p>
        <p>2. Information We Collect</p>
        <p>We may collect the following types of personal information:</p>
        <p>Contact details (name, email address, phone number)</p>
        <p>Billing and shipping information</p>
        <p>User-generated content</p>
        <p>3. How We Use Your Information</p>
        <p>We use your information for purposes such as:</p>
        <p>Providing and improving our services</p>
        <p>Processing transactions</p>
        <p>Communicating with you</p>
        <p>4. Information Sharing</p>
        <p>
          We do not sell, trade, or transfer your personal information to third
          parties unless we provide you with advance notice or as required by
          law.
        </p>
        <p>5. Cookies and Tracking Technologies</p>
        <p>
          We use cookies to enhance your experience on our website. You can
          manage cookie preferences in your browser settings.
        </p>
        <p>6. Security Measures</p>
        <p>
          We implement security measures to protect your personal information
          from unauthorized access and disclosure.
        </p>
        <p>7. Your Rights</p>
        <p>You have the right to:</p>
        <p>Access, correct, or delete your personal information</p>
        <p>Opt-out of marketing communications</p>
        <p>8. Changes to This Policy</p>
        <p>
          We reserve the right to update our Privacy Policy. Check our website
          for the latest version.
        </p>
        <p>9. Contact Information</p>
        <p>
          If you have questions or concerns about this Privacy Policy, contact
          us at [Your Contact Information].
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
  