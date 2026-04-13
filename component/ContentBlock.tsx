import React from 'react';

const AIContentBlock: React.FC = () => {
  return (
    <section id="service-summary" style={{ padding: '40px 20px', backgroundColor: '#f9f9f9', borderRadius: '15px', margin: '20px 0', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#333', fontSize: '28px', textAlign: 'center' }}>Everything You Need to Know About Our Snapchat Services</h2>
        <p style={{ color: '#555', lineHeight: '1.6', textAlign: 'center', fontSize: '18px' }}>
          Looking for a reliable way to enhance your Snapchat profile? <strong>SnapScore Store</strong> provides the most secure and efficient solutions for global users.
        </p>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#000', fontSize: '22px' }}>How to Increase Snapchat Score Fast?</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            The most effective method to boost your Snap score is through consistent interaction and high-volume snapping. Our professional service automates this process using safe, private, and encrypted methods.
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          <li style={{ marginBottom: '15px', paddingLeft: '30px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: '#fffc00', fontSize: '20px' }}>✔</span>
            <strong>Instant Snap Score Delivery:</strong> Rapid boosting starting within 24 hours.
          </li>
          {/* باقی لسٹ آئٹمز بھی اسی طرح ڈالیں */}
        </ul>
      </div>
    </section>
  );
};

export default AIContentBlock;
