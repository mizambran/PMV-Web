const BotonWhatsApp = ({ telefono, mensaje }) => {
  const abrirWhatsApp = () => {
    const numeroLimpio = telefono.replace(/\D/g, '');
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={abrirWhatsApp}
      aria-label="Contactar por WhatsApp"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <svg viewBox="0 0 32 32" width="32" height="32" fill="white">
        <path d="M16 2a13 13 0 0 0-11.2 19.6L3 29l7.6-1.8A13 13 0 1 0 16 2zm0 23.8a10.8 10.8 0 0 1-5.5-1.5l-.4-.2-4.1 1 1-4-.3-.4A10.8 10.8 0 1 1 16 25.8zm5.9-8.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.1 1.2-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </button>
  );
};

export default BotonWhatsApp;